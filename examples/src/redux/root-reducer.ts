import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { reducer as counters, State as CountersState } from '@src/redux/counters';
import { reducer as todos, State as TodosState } from '@src/redux/todos';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState,
  counters: CountersState,
  todos: TodosState,
}

import { RootAction } from '@src/redux';
export const rootReducer = combineReducers<RootState, RootAction>({
  router,
  counters,
  todos,
});
