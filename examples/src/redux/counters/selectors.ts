import { RootState } from '@src/redux';

export const getSfcCounter =
  (state: RootState) => state.counters.sfcCounter;
