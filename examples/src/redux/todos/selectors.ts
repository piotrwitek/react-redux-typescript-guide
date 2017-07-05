import { createSelector } from 'reselect';

import { IRootState } from '@src/redux';

export const getTodos =
  (state: IRootState) => state.todos.todos;

export const getTodosFilter =
  (state: IRootState) => state.todos.todosFilter;

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
