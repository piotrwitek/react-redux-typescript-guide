import { createSelector } from 'reselect';

import { TodosState } from './reducer';

export const getTodos = (state: TodosState) => state.todos;

export const getTodosFilter = (state: TodosState) => state.todosFilter;

export const getFilteredTodos = createSelector(getTodos, getTodosFilter, (todos, todosFilter) => {
  switch (todosFilter) {
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);

    default:
      return todos;
  }
});
