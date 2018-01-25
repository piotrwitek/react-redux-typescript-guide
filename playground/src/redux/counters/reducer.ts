import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { RootAction } from '@src/redux';

import { countersActions } from './';

export type CountersState = {
  readonly reduxCounter: number;
};

export const countersReducer = combineReducers<CountersState, RootAction>({
  reduxCounter: (state = 0, action) => {
    switch (action.type) {
      case getType(countersActions.increment):
        return state + 1; // action is type: { type: "INCREMENT"; }

      case getType(countersActions.add):
        return state + action.payload; // action is type: { type: "ADD"; payload: number; }

      default:
        return state;
    }
  },
});
