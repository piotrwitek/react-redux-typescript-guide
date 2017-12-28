import { createAction } from 'typesafe-actions';

export type IToast = {
  id: string;
  text: string;
};

export const actions = {
  addToast: createAction('ADD_TOAST', (toast: IToast) => ({
    type: 'ADD_TOAST',
    payload: toast,
  })),
  removeToast: createAction('REMOVE_TOAST', (id: string) => ({
    type: 'REMOVE_TOAST',
    payload: id,
  })),
};
