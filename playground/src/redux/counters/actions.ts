import { createAction } from 'typesafe-actions';

export const countersActions = {
  increment: createAction('INCREMENT'),
  add: createAction('ADD', (amount: number) => ({
    type: 'ADD',
    payload: amount,
  })),
};
