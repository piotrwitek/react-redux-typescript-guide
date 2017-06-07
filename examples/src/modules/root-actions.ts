// RootActions
import { IAction as ITodosAction } from '../modules/todos';

export type IRootAction =
  ITodosAction;

// import { returntypeof } from 'react-redux-typescript';

// // merging actions returned from all action creators
// const actions = Object.values({
//   ...converterActionCreators,
// }).map(returntypeof);

// export type IRootAction = typeof actions[number];
