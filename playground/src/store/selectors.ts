import { RootState } from 'MyTypes';
import { createSelector } from 'reselect';

import { countersSelectors } from '../features/counters';
import { todosSelectors } from '../features/todos';

export const getCountersState = (state: RootState) => state.counters;
export const getTodosState = (state: RootState) => state.todos;

export const getReduxCounter = createSelector(
  getCountersState,
  countersSelectors.getReduxCounter
);

export const getFilteredTodos = createSelector(
  getTodosState,
  todosSelectors.getFilteredTodos
);
