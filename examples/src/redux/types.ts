import { Dispatch as ReduxDispatch } from 'redux';
// import { ThunkAction as ReduxThunkAction } from 'redux-thunk';

import { IRootState, IRootAction } from '@src/redux';

export type IDispatch = ReduxDispatch<IRootState>;
export type IReducer<S> = (state: S, action: IRootAction) => S;

export type IApi = {};
// export type IThunkAction<T> = ReduxThunkAction<T, IRootState, IApi>;
