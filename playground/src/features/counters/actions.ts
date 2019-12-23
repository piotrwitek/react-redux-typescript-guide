/* eslint-disable */
import { action } from 'typesafe-actions';

import { ADD, INCREMENT } from './constants';

/* SIMPLE API */

export const increment = () => action(INCREMENT);
export const add = (amount: number) => action(ADD, amount);

/* ADVANCED API */

// More flexible allowing to create complex actions more easily
// use can use "action-creator" instance in place of "type constant"
// e.g. case getType(increment): return action.payload;
// This will allow to completely eliminate need for "constants" in your application, more info here:
// https://github.com/piotrwitek/typesafe-actions#constants

import { createAction } from 'typesafe-actions';
import { Todo } from '../todos/models';

export const emptyAction = createAction(INCREMENT)<void>();
export const payloadAction = createAction(ADD)<number>();
export const payloadMetaAction = createAction(ADD)<number, string>();

export const payloadCreatorAction = createAction(
  'TOGGLE_TODO',
  (todo: Todo) => todo.id
)<string>();
