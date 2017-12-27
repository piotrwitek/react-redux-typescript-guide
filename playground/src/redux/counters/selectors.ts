import { RootState } from '@src/redux';

export const getReduxCounter =
  (state: RootState) => state.counters.reduxCounter;
