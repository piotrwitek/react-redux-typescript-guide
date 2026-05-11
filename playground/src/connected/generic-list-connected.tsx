import * as React from 'react';
import Types from 'MyTypes';
import { connect } from 'react-redux';

import { GenericList } from '../components';
import { Todo } from '../features/todos/models';
import { getFilteredTodos } from '../features/todos/selectors';

type OwnProps = {
  itemRenderer: (item: Todo) => JSX.Element;
};

const mapStateToProps = (state: Types.RootState) => ({
  items: getFilteredTodos(state.todos),
});

export class TodoList extends GenericList<Todo> {}

export const TodoListConnected = connect<
  ReturnType<typeof mapStateToProps>,
  {},
  OwnProps,
  Types.RootState
>(mapStateToProps)(TodoList);
