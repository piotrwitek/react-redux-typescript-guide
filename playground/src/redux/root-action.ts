// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';

import { Actions as CountersActions } from '@src/redux/counters';
import { Actions as TodosActions } from '@src/redux/todos';
import { Actions as ToastsActions } from '@src/redux/toasts';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | ReactRouterAction
  | CountersActions[keyof CountersActions]
  | TodosActions[keyof TodosActions]
  | ToastsActions[keyof ToastsActions];
