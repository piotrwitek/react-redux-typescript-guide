import { RouterAction, LocationChangeAction } from 'react-router-redux';

import { CountersAction } from '../features/counters';

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | CountersAction;
