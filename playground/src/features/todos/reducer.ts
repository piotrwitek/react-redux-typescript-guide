import { combineReducers } from 'redux';
import { ActionsUnion } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import * as actions from './actions';
import { ADD, CHANGE_FILTER, TOGGLE } from './constants';

export type TodosState = {
  readonly isFetching: boolean;
  readonly errorMessage: string | null;
  readonly todos: Todo[];
  readonly todosFilter: TodosFilter;
};

export type TodosAction = ActionsUnion<typeof actions>;

export default combineReducers<TodosState, TodosAction>({
  isFetching: (state = false, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  errorMessage: (state = null, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  todos: (state = [], action) => {
    switch (action.type) {
      case ADD:
        return [...state, action.payload];

      case TOGGLE:
        return state.map(
          item =>
            item.id === action.payload
              ? { ...item, completed: !item.completed }
              : item
        );

      default:
        return state;
    }
  },
  todosFilter: (state = TodosFilter.All, action) => {
    switch (action.type) {
      case CHANGE_FILTER:
        return action.payload;

      default:
        return state;
    }
  },
});
