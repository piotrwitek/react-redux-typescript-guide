import { createAction } from 'typesafe-actions';
import cuid from 'cuid';

import { ITodosFilter } from './types';

const ADD_TODO = '@@todos/ADD_TODO';
const TOGGLE_TODO = '@@todos/TOGGLE_TODO';
const CHANGE_FILTER = '@@todos/CHANGE_FILTER';

export const addTodo = createAction(ADD_TODO,
  (title: string) => ({
    type: ADD_TODO,
    payload: {
      id: cuid(),
      title: title,
      completed: false,
    },
  })
);

export const toggleTodo = createAction(TOGGLE_TODO,
  (id: string) => ({ type: TOGGLE_TODO, payload: id })
);

export const changeFilter = createAction(CHANGE_FILTER,
  (filter: ITodosFilter) => ({ type: CHANGE_FILTER, payload: filter })
);
