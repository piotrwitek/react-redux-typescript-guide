import { Dispatch as ReduxDispatch } from 'redux';
import { ThunkAction as ReduxThunkAction } from 'redux-thunk';

import { IRootState, IRootAction } from '@src/redux';

export type Dispatch = ReduxDispatch<IRootState>;
export type Reducer<S> = (state: S, action: IRootAction) => S;

export type Api = {};
export type ThunkAction<T> = ReduxThunkAction<T, IRootState, Api>;
