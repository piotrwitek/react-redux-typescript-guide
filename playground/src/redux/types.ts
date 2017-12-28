import {
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
} from 'redux';

import { RootState, RootAction } from '@src/redux';

export type Dispatch = ReduxDispatch<RootAction>;
export type Reducer = ReduxReducer<RootState, RootAction>;

export type Api = {};

// import { ThunkAction as ReduxThunkAction } from 'redux-thunk';
// export type ThunkAction<T> = ReduxThunkAction<T, RootState, Api>;
