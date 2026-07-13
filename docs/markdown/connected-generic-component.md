## Connected Generic Component

> This example shows how to combine a **generic component** with React-Redux's `connect()`.
> TypeScript does not support generic type parameters directly in `connect()` calls,
> so we use a **factory function** pattern to create a typed connected component for a specific type `T`.

### Motivation

You may have a generic list component:

```tsx
interface GenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
}

function GenericList<T>(props: GenericListProps<T>) {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>{props.itemRenderer(item)}</li>
      ))}
    </ul>
  );
}
```

And you want to connect it to Redux for a specific type, e.g. `Todo`.

### Solution: Factory Function Pattern

Define a factory function that accepts a typed `mapStateToProps` and returns a connected component:

```tsx
import { connect } from 'react-redux';
import { RootState } from '../store/types';

export interface OwnProps<T> {
  itemRenderer: (item: T) => JSX.Element;
}

export interface StateProps<T> {
  items: T[];
}

export function connectGenericList<T>(
  mapStateToProps: (state: RootState, ownProps: OwnProps<T>) => StateProps<T>
) {
  return connect<StateProps<T>, {}, OwnProps<T>, RootState>(mapStateToProps)(
    GenericList as new (props: GenericListProps<T>) => GenericList<T>
  );
}
```

### Usage

```tsx
interface Todo {
  id: number;
  text: string;
}

const mapStateToProps = (state: RootState): StateProps<Todo> => ({
  items: state.todos,
});

// Create a connected generic list typed for Todo
export const ConnectedTodoList = connectGenericList<Todo>(mapStateToProps);

// In JSX:
<ConnectedTodoList
  itemRenderer={(todo) => <span>{todo.text}</span>}
/>
```

### Key Points

- The factory function `connectGenericList<T>` lets you instantiate the connected component for any type `T`.
- The type cast `GenericList as new (props: GenericListProps<T>) => GenericList<T>` is necessary because `connect()` does not directly support generic components.
- `OwnProps<T>` carries the `itemRenderer` prop, which comes from the parent component (not from Redux state).
- `StateProps<T>` carries the `items` prop, which is injected by Redux via `mapStateToProps`.
