import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { countersReducer } from '@src/redux/counters';
import { todosReducer} from '@src/redux/todos';

import { RootAction } from '@src/redux';

const reducerMap = {
  router: routerReducer,
  counters: countersReducer,
  todos: todosReducer,
};

interface StoreEnhancerState { }

export type RootState = { [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]> } & StoreEnhancerState;

export const rootReducer = combineReducers<RootState, RootAction>(reducerMap);
