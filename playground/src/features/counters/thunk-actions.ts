import { action, ActionType } from 'typesafe-actions';

import { Dispatch, ActionCreatorsMapObject } from 'redux';
import * as actions from './actions';

// CLASSIC API
export const thunkIncrement = () => (dispatch: Dispatch) =>
  dispatch(action('THUNK_INCREMENT'));
export const thunkAdd = (amount: number) => (dispatch: Dispatch) =>
  dispatch(action('THUNK_ADD', amount));

type ThunkActionType<M extends ActionCreatorsMapObject<any>> = ActionType<
  {
    [N in keyof M]: ReturnType<M[N]> extends (
      dispatch: Dispatch
    ) => { type: string }
      ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>
      : M[N]
  }
>;

const thunkActions = { thunkIncrement, thunkAdd, ...actions };
export type Action = ThunkActionType<typeof thunkActions>;
// type Action = EmptyAction<"THUNK_INCREMENT"> | PayloadAction<"THUNK_ADD", number> | EmptyAction<"counters/INCREMENT"> | PayloadAction<"counters/ADD", number>
