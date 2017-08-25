export const INCREMENT_SFC = 'INCREMENT_SFC';
export const DECREMENT_SFC = 'DECREMENT_SFC';

export type IActions = {
  INCREMENT_SFC: { type: typeof INCREMENT_SFC },
  DECREMENT_SFC: { type: typeof DECREMENT_SFC },
};

export type IAction = IActions[keyof IActions];

// Action Creators
export const actionCreators = {
  incrementSfc: (): IActions[typeof INCREMENT_SFC] => ({
    type: INCREMENT_SFC,
  }),
  decrementSfc: (): IActions[typeof DECREMENT_SFC] => ({
    type: DECREMENT_SFC,
  }),
};
