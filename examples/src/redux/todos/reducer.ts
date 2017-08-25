import { v4 } from 'uuid';
import { combineReducers } from 'redux';

import { RootAction } from '@src/redux';

import {
  ADD_TODO,
  TOGGLE_TODO,
  CHANGE_TODOS_FILTER,
  ITodo,
  ITodosFilter,
} from './';

export type State = {
  readonly isFetching: boolean,
  readonly errorMessage: string | null,
  readonly todos: ITodo[],
  readonly todosFilter: ITodosFilter,
};

export const reducer = combineReducers<State, RootAction>({
  isFetching: (state = false, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  errorMessage: (state = '', action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  todos: (state = [], action) => {
    switch (action.type) {
      case ADD_TODO:
        return [...state, {
          id: v4(),
          title: action.payload,
          completed: false,
        }];

      case TOGGLE_TODO:
        return state.map((item) => {
          if (item.id === action.payload) {
            item.completed = !item.completed;
          }
          return item;
        });

      default:
        return state;
    }
  },
  todosFilter: (state = '', action) => {
    switch (action.type) {
      case CHANGE_TODOS_FILTER:
        return action.payload;

      default:
        return state;
    }
  },
});
