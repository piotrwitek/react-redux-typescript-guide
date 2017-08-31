export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export type IToast = { id: string, text: string };

export type Actions = {
  ADD_TOAST: { type: typeof ADD_TOAST, payload: IToast },
  REMOVE_TOAST: { type: typeof REMOVE_TOAST, payload: string },
};

// Action Creators
export const actionCreators = {
  addToast: (payload: IToast): Actions[typeof ADD_TOAST] => ({
    type: ADD_TOAST, payload,
  }),
  removeToast: (payload: string): Actions[typeof REMOVE_TOAST] => ({
    type: REMOVE_TOAST, payload,
  }),
};
