import { combineReducers } from 'redux';

import { IRootAction } from '@src/redux';

import {
  INCREMENT_SFC,
  DECREMENT_SFC,
} from './';

export type IState = {
  readonly sfcCounter: number,
};

export const reducer = combineReducers<IState, IRootAction>({
  sfcCounter: (state = 0, action) => {
    switch (action.type) {
      case INCREMENT_SFC:
        return state + 1;

      case DECREMENT_SFC:
        return state + 1;

      default:
        return state;
    }
  },
});
