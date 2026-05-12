import Types from 'MyTypes';
import { connect } from 'react-redux';

import { GenericList, GenericListProps } from '../components';
import { todosSelectors } from '../features/todos';
import { Todo } from '../features/todos/models';

type StateProps<T> = Pick<GenericListProps<T>, 'items'>;
type OwnProps<T> = Pick<GenericListProps<T>, 'itemRenderer'>;

export const createConnectedList = <T,>(
  selectItems: (state: Types.RootState) => T[]
) => {
  class TypedGenericList extends GenericList<T> {}

  const mapStateToProps = (state: Types.RootState): StateProps<T> => ({
    items: selectItems(state),
  });

  return connect<
    StateProps<T>,
    {},
    OwnProps<T>,
    Types.RootState
  >(mapStateToProps)(TypedGenericList);
};

export const TodoListConnected = createConnectedList<Todo>(
  state => todosSelectors.getFilteredTodos(state.todos)
);
