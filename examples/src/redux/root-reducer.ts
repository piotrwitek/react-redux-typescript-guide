import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { reducer as counters, State as CountersState } from './counters';
import { reducer as todos, State as TodosState } from './todos';

import { RootAction } from './';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState,
  counters: CountersState,
  todos: TodosState,
}

export const rootReducer = combineReducers<RootState, RootAction>({
  router,
  counters,
  todos,
});
