import { createAction } from 'typesafe-actions';

import { ITodosFilter } from './';

export const actions = {
  addTodo: createAction('ADD_TODO', (text: string) => ({
    type: 'ADD_TODO',
    payload: text,
  })),
  toggleTodo: createAction('TOGGLE_TODO', (id: string) => ({
    type: 'TOGGLE_TODO',
    payload: id,
  })),
  changeFilter: createAction('CHANGE_FILTER', (filter: ITodosFilter) => ({
    type: 'CHANGE_FILTER',
    payload: filter,
  })),
};
