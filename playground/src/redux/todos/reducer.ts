import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { ITodo, ITodosFilter } from './types';
import * as todosActions from './actions';

export type TodosState = {
  readonly isFetching: boolean;
  readonly errorMessage: string | null;
  readonly todos: ITodo[];
  readonly todosFilter: ITodosFilter;
};

export type RootState = {
  todos: TodosState;
};

export const todosReducer = combineReducers<TodosState, TodosAction>({
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
      case getType(todosActions.addTodo):
        return [...state, action.payload];

      case getType(todosActions.toggleTodo):
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
      case getType(todosActions.changeFilter):
        return action.payload;

      default:
        return state;
    }
  },
});

import { $call } from 'utility-types';
const returnsOfActions = Object.values(todosActions).map($call);
export type TodosAction = typeof returnsOfActions[number];
