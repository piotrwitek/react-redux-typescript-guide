import { ActionType, getType } from 'typesafe-actions';

import { Todo } from '../features/todos/models';
import * as actions from '../features/todos/actions';

export type TodosAction = ActionType<typeof actions>;

function createReducer<S, A extends { type: string }>(
  initialState: S,
  handlers: {
    [P in A['type']]?: A extends { type: P }
      ? (state: S, action: A) => S
      : never
  }
) {
  return (state: S = initialState, action: A): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return (handlers as any)[action.type](state, action);
    } else {
      return state;
    }
  };
}

export const todos = createReducer<Todo[], TodosAction>([], {
  ['todos/ADD' as 'todos/ADD']: (state, action) => {
    return [...state, action.payload];
  },
  ['todos/TOGGLE']: (state, action) => {
    return state.map(item =>
      item.id === action.payload
        ? { ...item, completed: !item.completed }
        : item
    );
  },
});
