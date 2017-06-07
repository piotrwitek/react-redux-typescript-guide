import { IState } from './reducer';

export const getActiveFilter =
  (state: IState) => state.activeFilter;
