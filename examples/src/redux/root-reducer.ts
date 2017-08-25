import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { reducer as counters, IState as CountersState } from './counters';
import { reducer as todos, IState as TodosState } from './todos';

import { IRootAction } from './';

interface IStoreEnhancerState { }

export interface RootState extends IStoreEnhancerState {
  router: RouterState,
  counters: CountersState,
  todos: TodosState,
}

export const rootReducer = combineReducers<RootState, IRootAction>({
  router,
  counters,
  todos,
});
