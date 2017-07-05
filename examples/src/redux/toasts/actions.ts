export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export type IToast = { id: string, text: string };

export type IActions = {
  ADD_TOAST: { type: typeof ADD_TOAST, payload: IToast },
  REMOVE_TOAST: { type: typeof REMOVE_TOAST, payload: string },
};

export type IAction = IActions[keyof IActions];

// Action Creators
export const actionCreators = {
  addToast: (payload: IToast): IActions[typeof ADD_TOAST] => ({
    type: ADD_TOAST, payload,
  }),
  removeToast: (payload: string): IActions[typeof REMOVE_TOAST] => ({
    type: REMOVE_TOAST, payload,
  }),
};
