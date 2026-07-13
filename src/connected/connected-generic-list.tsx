import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/types';

// Generic component props
export interface GenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
}

// Generic list component
function GenericList<T>(props: GenericListProps<T>) {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>{props.itemRenderer(item)}</li>
      ))}
    </ul>
  );
}

// Own props for the connected component
export interface OwnProps<T> {
  itemRenderer: (item: T) => JSX.Element;
}

// State props
export interface StateProps<T> {
  items: T[];
}

// Since TypeScript doesn't support generic type parameters directly in connect(),
// we use a factory function pattern to create a typed connected component.
export function connectGenericList<T>(
  mapStateToProps: (state: RootState, ownProps: OwnProps<T>) => StateProps<T>
) {
  // We use a cast here because connect cannot directly handle generic components.
  // The result is a connected component typed for the specific T.
  return connect<StateProps<T>, {}, OwnProps<T>, RootState>(mapStateToProps)(
    GenericList as new (props: GenericListProps<T>) => GenericList<T>
  );
}

// Example usage with a concrete type (e.g., string):
//
// interface Todo {
//   id: number;
//   text: string;
// }
//
// const mapStateToProps = (state: RootState): StateProps<Todo> => ({
//   items: state.todos,
// });
//
// export const ConnectedTodoList = connectGenericList<Todo>(mapStateToProps);
//
// Usage in JSX:
// <ConnectedTodoList itemRenderer={(todo) => <span>{todo.text}</span>} />
