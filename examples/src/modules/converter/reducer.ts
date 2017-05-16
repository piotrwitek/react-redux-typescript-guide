import { RootAction } from '../../types';
import {
  INCREASE_COUNTER,
  CHANGE_BASE_CURRENCY,
} from './actions';

// State
export type State = {
  readonly counter: number,
  readonly baseCurrency: string,
};
export const initialState: State = {
  counter: 0,
  baseCurrency: 'EUR',
};

// Reducer
export default function reducer(state: State = initialState, action: RootAction): State {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state, counter: state.counter + 1, // no payload
      };
    case CHANGE_BASE_CURRENCY:
      return {
        ...state, baseCurrency: action.payload, // payload: string
      };

    default: return state;
  }
}
