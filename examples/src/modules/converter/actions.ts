// Action Types - could be kept in separate file...
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';

// Action Creators
export default {
  increaseCounter: () => ({
    type: INCREASE_COUNTER as typeof INCREASE_COUNTER,
  }),
  changeBaseCurrency: (payload: string) => ({
    type: CHANGE_BASE_CURRENCY as typeof CHANGE_BASE_CURRENCY, payload,
  }),
};
