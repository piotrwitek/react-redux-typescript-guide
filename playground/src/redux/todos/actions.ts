import { ITodosFilter } from './';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CHANGE_TODOS_FILTER = 'CHANGE_TODOS_FILTER';

export type Actions = {
  ADD_TODO: { type: typeof ADD_TODO, payload: string },
  TOGGLE_TODO: { type: typeof TOGGLE_TODO, payload: string },
  CHANGE_TODOS_FILTER: { type: typeof CHANGE_TODOS_FILTER, payload: ITodosFilter },
};

export type Action = Actions[keyof Actions];

// Action Creators
export const actionCreators = {
  addTodo: (payload: string): Actions[typeof ADD_TODO] => ({
    type: ADD_TODO, payload,
  }),
  toggleTodo: (payload: string): Actions[typeof TOGGLE_TODO] => ({
    type: TOGGLE_TODO, payload,
  }),
  changeFilter: (payload: ITodosFilter): Actions[typeof CHANGE_TODOS_FILTER] => ({
    type: CHANGE_TODOS_FILTER, payload,
  }),
};
