import { createSelector } from 'reselect';
import { RootState } from '../../store/root-reducer';

/**
 * Selectors are used to derive data from the Redux store state.
 * They are composed using `createSelector` from the `reselect` library.
 *
 * To adapt global state (RootState) to feature-specific state, we use
 * a "input selector" that picks the feature slice from the global state.
 */

// Input selector: picks the counters feature slice from global state
const getCounters = (state: RootState) => state.counters;

// Derived selectors
export const getCountersState = createSelector(
  getCounters,
  counters => counters
);

export const getCounter = createSelector(
  getCounters,
  counters => counters.counter
);

export const getCounterHasValue = createSelector(
  getCounter,
  counter => counter > 0
);
