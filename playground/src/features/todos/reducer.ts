import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import * as actions from './actions';
import { ADD, CHANGE_FILTER, TOGGLE } from './constants';

export type TodosAction = ActionType<typeof actions>;

export type TodosState = Readonly<{
  todos: Todo[];
  todosFilter: TodosFilter;
}>;
const initialState: TodosState = {
  todos: [],
  todosFilter: TodosFilter.All,
};

export default combineReducers<TodosState, TodosAction>({
  todos: (state = initialState.todos, action) => {
    switch (action.type) {
      case ADD:
        return [...state, action.payload];

      case TOGGLE:
        return state.map(item =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        );

      default:
        return state;
    }
  },
  todosFilter: (state = initialState.todosFilter, action) => {
    switch (action.type) {
      case CHANGE_FILTER:
        return action.payload;

      default:
        return state;
    }
  },
});
