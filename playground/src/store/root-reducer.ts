import {
  combineReducers,
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
} from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

// import { RootAction } from './root-action';
import { countersReducer, CountersState } from '../features/counters';

export interface RootState {
  router: RouterState;
  counters: CountersState;
}

export default combineReducers<RootState, RootAction>({
  router: routerReducer,
  counters: countersReducer,
});

export type Dispatch = ReduxDispatch<RootAction>;
export type Reducer = ReduxReducer<RootState, RootAction>;
