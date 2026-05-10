import * as React from 'react';
import { connect } from 'react-redux';

/** Generic List Component */
export type GenericListProps<T> = {
  readonly items: T[];
  readonly itemRenderer: (item: T) => JSX.Element;
};

export class GenericList<T> extends React.Component<GenericListProps<T>> {
  render() {
    const { items, itemRenderer } = this.props;
    return (
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{itemRenderer(item)}</li>
        ))}
      </ul>
    );
  }
}

/**
 * Connected Generic List
 *
 * TypeScript does not allow parameterized generic type arguments in JSX, so
 * `connect(...)(GenericList<Todo>)` is not valid syntax.
 *
 * Workaround:
 *  1. Fix the generic type parameter via a concrete subclass
 *  2. Connect the concrete subclass
 */

export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
};

type StoreState = {
  readonly todos: Todo[];
};

type OwnProps = {};

// Step 1 – Concrete subclass fixes the type parameter to `Todo`
class TodoList extends GenericList<Todo> {}

// Step 2 – mapStateToProps typed against the concrete props
const mapStateToProps = (
  state: StoreState,
  _ownProps: OwnProps
): Pick<GenericListProps<Todo>, 'items'> => ({
  items: state.todos,
});

// Step 3 – connect the concrete subclass
export const ConnectedTodoList = connect(mapStateToProps)(TodoList);
