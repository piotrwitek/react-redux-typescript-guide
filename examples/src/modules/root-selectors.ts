import { createSelector } from 'reselect';

import { IRootState } from '../modules';
import { getTodos } from './todos';
import { getActiveFilter } from './route-params';

export const getVisibleTodos = createSelector(
  (rootState: IRootState) => getTodos(rootState.converter),
  (rootState: IRootState) => getActiveFilter(rootState.routeParams),
  (todos, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'active':
        return todos.filter((t) => !t.completed);

      default:
        return todos;
    }
  },
);
