import { v4 } from 'uuid';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { RootAction } from '@src/redux';

import { actions, ITodo, ITodosFilter } from './';

export type State = {
  readonly isFetching: boolean;
  readonly errorMessage: string | null;
  readonly todos: ITodo[];
  readonly todosFilter: ITodosFilter;
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
      case getType(actions.addTodo):
        return [...state, {
          id: v4(),
          title: action.payload,
          completed: false,
        }];

      case getType(actions.toggleTodo):
        return state.map((item) => item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
        );

      default:
        return state;
    }
  },
  todosFilter: (state = '', action) => {
    switch (action.type) {
      case getType(actions.changeFilter):
        return action.payload;

      default:
        return state;
    }
  },
});
