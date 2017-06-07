// Action Types - could be kept in separate file...
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DISPLAY_TOAST = 'DISPLAY_TOAST';

export type IActions = {
  ADD_TODO: { type: typeof ADD_TODO, payload: string },
  TOGGLE_TODO: { type: typeof TOGGLE_TODO, payload: string },
  DISPLAY_TOAST: { type: typeof DISPLAY_TOAST, payload: string },
};

export type IAction = IActions[keyof IActions];

// Action Creators
export const actionCreators = {
  addTodo: (payload: string) => ({
    type: ADD_TODO as typeof ADD_TODO,
    payload,
  }),
  toggleTodo: (payload: string) => ({
    type: TOGGLE_TODO as typeof TOGGLE_TODO,
    payload,
  }),
  displayToast: (payload: string) => ({
    type: DISPLAY_TOAST as typeof DISPLAY_TOAST,
    payload,
  }),
};
