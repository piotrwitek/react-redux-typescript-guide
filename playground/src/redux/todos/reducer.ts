import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { ITodo, ITodosFilter } from './types';
import { addTodo, toggleTodo, changeFilter } from './actions';

export type TodosState = {
  readonly isFetching: boolean;
  readonly errorMessage: string | null;
  readonly todos: ITodo[];
  readonly todosFilter: ITodosFilter;
};

export type RootState = {
  readonly todos: TodosState;
};

export const todosReducer = combineReducers<TodosState, TodosAction>({
  isFetching: (state = false, action) => {
    switch (action.type) {
      default: return state;
    }
  },
  errorMessage: (state = '', action) => {
    switch (action.type) {
      default: return state;
    }
  },
  todos: (state = [], action) => {
    switch (action.type) {
      case getType(addTodo):
        return [...state, action.payload];

      case getType(toggleTodo):
        return state.map((item) => item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
        );

      default: return state;
    }
  },
  todosFilter: (state = '', action) => {
    switch (action.type) {
      case getType(changeFilter):
        return action.payload;

      default: return state;
    }
  },
});

// inferring union type of actions
import { $call } from 'utility-types';
import * as actions from './actions';
const returnsOfActions = Object.values(actions).map($call);
export type TodosAction = typeof returnsOfActions[number];
