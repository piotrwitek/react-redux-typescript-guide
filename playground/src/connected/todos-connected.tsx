import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store/root-reducer';
import { todosActions } from '../features/todos';
import {
  getTodosFilteredList,
  getTodosFilter,
} from '../features/todos/selectors';
import TodoList from '../components/todo-list';

// mapStateToProps using selectors to derive data from global state.
// Selectors encapsulate the knowledge of the state shape and
// any derived computations (e.g., filtering).
const mapStateToProps = (state: RootState) => ({
  todos: getTodosFilteredList(state),
  filter: getTodosFilter(state),
});

const mapDispatchToProps = {
  toggle: todosActions.toggle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
