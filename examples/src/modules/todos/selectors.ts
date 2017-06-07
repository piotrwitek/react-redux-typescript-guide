import { IState } from './reducer';

export const getTodos =
  (state: IState) => state.records;
