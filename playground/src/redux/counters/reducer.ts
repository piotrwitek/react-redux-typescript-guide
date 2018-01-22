import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { RootAction } from '@src/redux';

import { actions } from './';

export type State = {
  readonly reduxCounter: number;
};

export const reducer = combineReducers<State, RootAction>({
  reduxCounter: (state = 0, action) => {
    switch (action.type) {
      case getType(actions.increment):
        return state + 1; // action is type: { type: "INCREMENT"; }

      case getType(actions.add):
        return state + action.payload; // action is type: { type: "ADD"; payload: number; }

      default:
        return state;
    }
  },
});
