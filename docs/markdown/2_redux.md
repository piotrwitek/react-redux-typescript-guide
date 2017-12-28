# Redux

## Action Creators

> Using Typesafe Action Creators helpers for Redux [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions)

A recommended approach is to use a simple functional helper to automate the creation of type-safe action creators. The advantage is that we can reduce a lot of code repetition and also minimize surface of errors by using type-checked API.
> There are more specialized functional helpers available that will help you to further reduce tedious boilerplate and type-annotations in common scenarios like reducers (`getType`) or epics (`isActionOf`).  
All that without losing type-safety! Please check this very short [Tutorial](https://github.com/piotrwitek/typesafe-actions#tutorial)

::example='../../playground/src/redux/counters/actions.ts'::
::usage='../../playground/src/redux/counters/actions.usage.ts'::

[⇧ back to top](#table-of-contents)

---

## Reducers

### State with Type-level Immutability
Declare reducer `State` type with `readonly` modifier to get "type level" immutability
```ts
export type State = {
  readonly counter: number,
};
```

Readonly modifier allow initialization, but will not allow rassignment by highlighting compiler errors
```ts
export const initialState: State = {
  counter: 0,
}; // OK

initialState.counter = 3; // Error, cannot be mutated
```

#### Caveat: Readonly does not provide a recursive immutability on objects
This means that the `readonly` modifier doesn't propagate immutability down to "properties" of objects. You'll need to set it explicitly on each nested property that you want.

Check the example below:
```ts
export type State = {
  readonly containerObject: {
    readonly immutableProp: number,
    mutableProp: number,
  }
};

state.containerObject = { mutableProp: 1 }; // Error, cannot be mutated
state.containerObject.immutableProp = 1; // Error, cannot be mutated

state.containerObject.mutableProp = 1; // OK! No error, can be mutated
```

#### Best-practices for nested immutability
> use `Readonly` or `ReadonlyArray` [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

```ts
export type State = Readonly<{
  counterPairs: ReadonlyArray<Readonly<{
    immutableCounter1: number,
    immutableCounter2: number,
  }>>,
}>;

state.counterPairs[0] = { immutableCounter1: 1, immutableCounter2: 1 }; // Error, cannot be mutated
state.counterPairs[0].immutableCounter1 = 1; // Error, cannot be mutated
state.counterPairs[0].immutableCounter2 = 1; // Error, cannot be mutated
```

> _There are some experiments in the community to make a `ReadonlyRecursive` mapped type. I'll update this section of the guide as soon as they are stable_

[⇧ back to top](#table-of-contents)

### Reducer Example
> using `getType` helper and [Discriminated Union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

::example='../../playground/src/redux/counters/reducer.ts'::

[⇧ back to top](#table-of-contents)

---

## Store Configuration

### Create Root State and Root Action Types

#### `RootState` - interface representing redux state tree
Can be imported in connected components to provide type-safety to Redux `connect` function

::example='../../playground/src/redux/root-reducer.ts'::

[⇧ back to top](#table-of-contents)

#### `RootAction` - union type of all action objects
Can be imported in various layers receiving or sending redux actions like: reducers, sagas or redux-observables epics

::example='../../playground/src/redux/root-action.ts'::

[⇧ back to top](#table-of-contents)

### Create Store

When creating the store, use rootReducer. This will set-up a **strongly typed Store instance** with type inference.
> The resulting store instance methods like `getState` or `dispatch` will be type checked and expose type errors

::example='../../playground/src/store.ts'::

---

## Async Flow

### "redux-observable"

::example='../../playground/src/redux/toasts/epics.ts'::

[⇧ back to top](#table-of-contents)

---

## Selectors 

### "reselect"

```ts
import { createSelector } from 'reselect';

import { RootState } from '@src/redux';

export const getTodos =
  (state: RootState) => state.todos.todos;

export const getTodosFilter =
  (state: RootState) => state.todos.todosFilter;

export const getFilteredTodos = createSelector(
  getTodos, getTodosFilter,
  (todos, todosFilter) => {
    switch (todosFilter) {
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'active':
        return todos.filter((t) => !t.completed);

      default:
        return todos;
    }
  },
);
```

[⇧ back to top](#table-of-contents)

---

### Action Creators - Alternative Pattern
This pattern is focused on a KISS principle - to stay clear of abstractions and to follow a more complex but familiar JavaScript "const" based approach:

Advantages:
- familiar to standard JS "const" based approach

Disadvantages:
- significant amount of boilerplate and duplication
- more complex compared to `createAction` helper library
- necessary to export both action types and action creators to re-use in other places, e.g. `redux-saga` or `redux-observable`

```tsx
export const INCREMENT = 'INCREMENT'; 
export const ADD = 'ADD'; 

export type Actions = { 
  INCREMENT: { 
    type: typeof INCREMENT, 
  }, 
  ADD: { 
    type: typeof ADD,
    payload: number, 
  }, 
}; 

export const actions = { 
  increment: (): Actions[typeof INCREMENT] => ({ 
    type: INCREMENT, 
  }), 
  add: (amount: number): Actions[typeof ADD] => ({ 
    type: ADD,
    payload: amount,
  }),
};
```

[⇧ back to top](#table-of-contents)