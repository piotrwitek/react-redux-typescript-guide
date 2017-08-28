// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';

import { Action as CountersAction } from '@src/redux/counters';
import { Action as TodosAction } from '@src/redux/todos';
import { Action as ToastsAction } from '@src/redux/toasts';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | ReactRouterAction
  | CountersAction
  | TodosAction
  | ToastsAction;
