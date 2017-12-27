// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { getReturnOfExpression } from 'react-redux-typescript';

import { actions as countersAC } from '@src/redux/counters';
import { actions as todosAC } from '@src/redux/todos';
import { actions as toastsAC } from '@src/redux/toasts';

export const allActions = {
  ...countersAC,
  ...todosAC,
  ...toastsAC,
};

const returnOfActions =
  Object.values(allActions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
