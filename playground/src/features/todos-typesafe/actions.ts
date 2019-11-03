import cuid from 'cuid';
import { createAction } from 'typesafe-actions';

import { TodosFilter, Todo } from './models';

const ADD = 'todos/ADD';
const TOGGLE = 'todos/TOGGLE';
const CHANGE_FILTER = 'todos/CHANGE_FILTER';

export const add = createAction(ADD, (title: string) => ({
  id: cuid(),
  title,
}))<Todo>();

export const toggle = createAction(TOGGLE)<{ id: string }>();

export const changeFilter = createAction(CHANGE_FILTER)<TodosFilter>();
