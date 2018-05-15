// import { RouterAction, LocationChangeAction } from 'react-router-redux';
// import { CountersAction } from '../features/counters';

type ReactRouterAction = RouterAction | LocationChangeAction;
declare type RootAction = ReactRouterAction | CountersAction;
