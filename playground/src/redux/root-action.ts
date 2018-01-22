// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { $call } from 'utility-types';

import { countersActions } from '@src/redux/counters';
import { todosActions } from '@src/redux/todos';
import { toastsActions } from '@src/redux/toasts';

const returnsOfActions = [
  ...Object.values(countersActions),
  ...Object.values(todosActions),
  ...Object.values(toastsActions),
].map($call);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
