import { action, createAction, createStandardAction } from 'typesafe-actions';

import { ADD, INCREMENT } from './constants';

// SIMPLE TYPESAFE-ACTION
export const increment = () => action(INCREMENT);
export const add = (amount: number) => action(ADD, amount);

// EQUIVALENT ALTERNATIVES that will allow to use "action-creators" instead of "constants" in reducers & epics:
// check more info here: https://github.com/piotrwitek/typesafe-actions#tutorial
// OPTION 1:
// export const increment = createStandardAction(INCREMENT)<void>();
// export const add = createStandardAction(ADD)<number>();

// OPTION 2:
// export const increment = createAction(INCREMENT);
// export const add = createAction(ADD, resolve => {
//   return (amount: number) => resolve(amount);
// });
