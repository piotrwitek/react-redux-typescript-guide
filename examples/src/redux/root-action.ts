// RootActions
import { IAction as ICountersAction } from '@src/redux/counters';
import { IAction as ITodosAction } from '@src/redux/todos';
import { IAction as IToastsAction } from '@src/redux/toasts';

export type IRootAction =
  | ICountersAction
  | ITodosAction
  | IToastsAction;

// import { returntypeof } from 'react-redux-typescript';

// // merging actions returned from all action creators
// const actions = Object.values({
//   ...converterActionCreators,
// }).map(returntypeof);

// export type IRootAction = typeof actions[number];
