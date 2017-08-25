// RootActions
import { Action as CountersAction } from '@src/redux/counters';
import { Action as TodosAction } from '@src/redux/todos';
import { Action as ToastsAction } from '@src/redux/toasts';

export type RootAction =
  | CountersAction
  | TodosAction
  | ToastsAction;

// import { returntypeof } from 'react-redux-typescript';

// // merging actions returned from all action creators
// const actions = Object.values({
//   ...converterActionCreators,
// }).map(returntypeof);

// export type IRootAction = typeof actions[number];
