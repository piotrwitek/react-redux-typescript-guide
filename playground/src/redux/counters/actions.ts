export const INCREMENT_SFC = 'INCREMENT_SFC';
export const DECREMENT_SFC = 'DECREMENT_SFC';

export type Actions = {
  INCREMENT_SFC: {
    type: typeof INCREMENT_SFC,
  },
  DECREMENT_SFC: {
    type: typeof DECREMENT_SFC,
  },
};

// Action Creators
export const actionCreators = {
  incrementSfc: (): Actions[typeof INCREMENT_SFC] => ({
    type: INCREMENT_SFC,
  }),
  decrementSfc: (): Actions[typeof DECREMENT_SFC] => ({
    type: DECREMENT_SFC,
  }),
};
