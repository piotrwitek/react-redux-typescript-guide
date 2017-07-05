import { IRootState } from '@src/redux';

export const getSfcCounter =
  (state: IRootState) => state.counters.sfcCounter;

export const getClassCounter =
  (state: IRootState) => state.counters.classCounter;
