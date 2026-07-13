import { createSelector } from 'reselect';
import { RootState } from '../../store/root-reducer';

/**
 * Selectors are used to derive data from the Redux store state.
 * They are composed using `createSelector` from the `reselect` library.
 *
 * To adapt global state (RootState) to feature-specific state, we use
 * a "input selector" that picks the feature slice from the global state.
 */

// Input selector: picks the todos feature slice from global state
const getTodos = (state: RootState) => state.todos;

// Derived selectors
export const getTodosState = createSelector(
  getTodos,
  todos => todos
);

export const getTodosList = createSelector(
  getTodos,
  todos => todos.todos
);

export const getTodosFilter = createSelector(
  getTodos,
  todos => todos.filter
);

export const getTodosFilteredList = createSelector(
  getTodosList,
  getTodosFilter,
  (todos, filter) => todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.done;
      case 'completed':
        return todo.done;
      default:
        return true;
    }
  })
);
