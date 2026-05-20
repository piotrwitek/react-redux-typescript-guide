import type * as Types from 'MyTypes';
import type { Dispatch } from 'redux';

import services from '../services';

export const selectReduxCounter = (state: Types.RootState) =>
  state.counters.reduxCounter;

export const dispatchRootAction = (
  dispatch: Dispatch<Types.RootAction>,
  action: Types.RootAction
) => dispatch(action);

export const configuredServices: Types.Services = services;
