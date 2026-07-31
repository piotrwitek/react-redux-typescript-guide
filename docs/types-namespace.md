# Types Global Namespace

## Overview

The `Types` global namespace is a cross-cutting module pattern that encapsulates all type definitions in your React-Redux-TypeScript application. It provides a centralized, yet distributed approach to type management using the **inversion of control** principle.

## Design Philosophy

Instead of defining all types in one monolithic file, each module is responsible for extending the `Types` namespace with its own type definitions. This creates a clean separation of concerns while maintaining a single import point for type consumers.

## Key Benefits

### 1. Simplicity to Extend
Each module extends the namespace independently without modifying a central types file:

```typescript
// features/user/types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

declare module 'Types' {
  export type UserAction = ActionType<typeof actions>;
}
```

### 2. Easy Maintenance
When you remove a module, its type extensions are automatically removed because they're colocated:

```
features/
  user/
    actions.ts
    reducer.ts
    types.ts      # Delete this module, types extension goes with it
```

### 3. Clean Imports
Type consumers import from a single, predictable location:

```typescript
import Types from 'Types';

// In reducers
const reducer = (state: Types.RootState, action: Types.RootAction) => {
  // ...
};

// In connected components
const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  // ...
});

// In epics (redux-observable)
const epic: Epic<Types.RootAction, Types.RootAction, Types.RootState, Types.Services> = 
  (action$, state$, { api }) => {
    // ...
  };
```

## Implementation

### Step 1: Create the Base Types Module

Create a `src/Types/index.ts` file that serves as the namespace anchor:

```typescript
// src/Types/index.ts
export type RootAction = any; // Will be overridden by module augmentation
export type RootState = any;  // Will be overridden by module augmentation

export default {
  // Re-export for convenient access
} as const;
```

### Step 2: Configure TypeScript Path Mapping

Add a path alias in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "Types": ["Types"]
    }
  }
}
```

### Step 3: Extend from Feature Modules

Each feature module extends the namespace with its types:

```typescript
// features/todos/types.ts
import { StateType, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import * as reducer from './reducer';

// Extend the Types namespace
declare module 'Types' {
  export type TodosAction = ActionType<typeof actions>;
  export type TodosState = StateType<typeof reducer>;
}
```

```typescript
// features/user/types.ts
import { StateType, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import * as reducer from './reducer';

declare module 'Types' {
  export type UserAction = ActionType<typeof actions>;
  export type UserState = StateType<typeof reducer>;
}
```

### Step 4: Combine Types in Root Store

Create combined types that aggregate all feature types:

```typescript
// store/types.ts
import { StateType } from 'typesafe-actions';
import { RouterAction, LocationChangeAction } from 'connected-react-router';
import rootReducer from './root-reducer';

// Import all feature type extensions
import 'features/todos/types';
import 'features/user/types';

declare module 'Types' {
  export type RootState = StateType<typeof rootReducer>;
  
  export type RootAction = 
    | TodosAction 
    | UserAction 
    | RouterAction 
    | LocationChangeAction;
    
  export interface Services {
    api: typeof import('../services/api').default;
    localStorage: typeof import('../services/localStorage').default;
  }
}
```

### Step 5: Use in Application Code

```typescript
// components/TodoList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Types from 'Types';
import { addTodo } from 'features/todos/actions';

const TodoList: React.FC = () => {
  const todos = useSelector((state: Types.RootState) => state.todos);
  const dispatch = useDispatch<Dispatch<Types.RootAction>>();
  
  const handleAdd = (text: string) => {
    dispatch(addTodo(text));
  };
  
  return (
    <div>
      {todos.map(todo => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
};
```

```typescript
// epics/todos.epic.ts
import { Epic } from 'redux-observable';
import { filter, switchMap, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import Types from 'Types';
import { fetchTodos, fetchTodosSuccess } from 'features/todos/actions';

export const fetchTodosEpic: Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState,
  Types.Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchTodos)),
    switchMap(() =>
      api.getTodos().pipe(
        map(todos => fetchTodosSuccess(todos))
      )
    )
  );
```

## Best Practices

### 1. Always Import Type Extensions
Ensure your root store types file imports all feature type modules:

```typescript
// store/types.ts
import 'features/todos/types';
import 'features/user/types';
import 'features/notifications/types';
```

### 2. Colocate Type Extensions with Features
Keep type declarations close to the code they describe:

```
features/
  todos/
    actions.ts
    reducer.ts
    types.ts       # Types extension here
    selectors.ts
```

### 3. Use Discriminated Unions for Actions
Leverage TypeScript's discriminated unions for type-safe action handling:

```typescript
declare module 'Types' {
  export type RootAction = 
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'REMOVE_TODO'; payload: number }
    | { type: 'FETCH_USER'; payload: { id: string } };
}

// TypeScript narrows the type based on the discriminant
function reducer(state: Types.RootState, action: Types.RootAction) {
  switch (action.type) {
    case 'ADD_TODO':
      // action.payload is string
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      // action.payload is number
      return { ...state, todos: state.todos.filter((_, i) => i !== action.payload) };
  }
}
```

### 4. Export Service Types
Define external dependencies in the Types namespace:

```typescript
declare module 'Types' {
  export interface Services {
    api: ApiClient;
    logger: Logger;
    analytics: Analytics;
  }
}
```

## Migration Guide

If you have an existing monolithic types file:

1. **Create the Types namespace anchor** (`src/Types/index.ts`)
2. **Move feature-specific types** to their respective feature folders
3. **Convert to module augmentation** using `declare module 'Types'`
4. **Update imports** from `import { RootState } from 'store/types'` to `import Types from 'Types'`
5. **Test incrementally** by migrating one feature at a time

## Common Patterns

### Async Action Types
```typescript
// features/todos/types.ts
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

declare module 'Types' {
  export type TodosAction = ActionType<typeof actions>;
  
  export interface TodosState {
    items: Todo[];
    loading: boolean;
    error: string | null;
  }
}
```

### Selector Types
```typescript
import Types from 'Types';

export const selectTodos = (state: Types.RootState) => state.todos.items;
export const selectLoading = (state: Types.RootState) => state.todos.loading;
```

### Thunk Types
```typescript
import { ThunkAction } from 'redux-thunk';
import Types from 'Types';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Types.RootState,
  Types.Services,
  Types.RootAction
>;
```

## Conclusion

The `Types` global namespace pattern provides a scalable, maintainable approach to type management in large React-Redux-TypeScript applications. By distributing type ownership to individual modules while maintaining a centralized import point, you achieve both modularity and developer ergonomics.
