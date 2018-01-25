import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { countersReducer, CountersState } from '@src/redux/counters';
import { todosReducer, TodosState } from '@src/redux/todos';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  counters: CountersState;
  todos: TodosState;
}

import { RootAction } from '@src/redux';
export const rootReducer = combineReducers<RootState, RootAction>({
  router: routerReducer,
  counters: countersReducer,
  todos: todosReducer,
});
