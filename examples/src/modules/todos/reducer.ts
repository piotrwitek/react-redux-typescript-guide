import { Reducer } from 'redux';

import { IRootAction } from '../../modules';
import {
  ADD_TODO,
  TOGGLE_TODO,
} from './actions';

export type ITodo = {
  id: string,
  title: string,
  completed: boolean,
};

// State
export type IState = {
  readonly isFetching: boolean,
  readonly errorMessage: string,
  readonly records: ITodo[],
};

export const initialState: IState = {
  isFetching: false,
  errorMessage: '',
  records: [],
};

// Reducer
export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction,
): IState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        records: [...state.records, {
          id: 'adfa',
          title: action.payload,
          completed: false,
        }],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        records: state.records.map((record) => {
          if (record.id === action.payload) {
            record.completed = !record.completed;
          }
          return record;
        }),
      };

    default: return state;
  }
};
