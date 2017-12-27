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
        return state + 1;

      case getType(actions.add):
        return state + action.payload;

      default:
        return state;
    }
  },
});
