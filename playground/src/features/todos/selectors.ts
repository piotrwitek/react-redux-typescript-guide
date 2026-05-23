import { createSelector } from 'reselect';
import Types from 'MyTypes';

import { TodosState } from './reducer';

// ── Feature-level selectors (accept the slice, not the whole store) ────────────
// These are used internally and in unit tests where you have direct access to
// the todos slice of state.

export const getTodos = (state: TodosState) => state.todos;

export const getTodosFilter = (state: TodosState) => state.todosFilter;

export const getFilteredTodos = createSelector(
  getTodos,
  getTodosFilter,
  (todos, todosFilter) => {
    switch (todosFilter) {
      case 'completed':
        return todos.filter(t => t.completed);
      case 'active':
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }
);

// ── Root-level selectors (accept RootState, handle the slice key internally) ──
// Use these in connected components / mapStateToProps so the component does not
// need to know where in the store the todos slice lives.

export const selectTodosState = (state: Types.RootState): TodosState =>
  state.todos;

export const selectTodos = createSelector(selectTodosState, getTodos);

export const selectTodosFilter = createSelector(
  selectTodosState,
  getTodosFilter
);

export const selectFilteredTodos = createSelector(
  selectTodosState,
  getFilteredTodos
);
