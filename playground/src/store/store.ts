import { RootAction, RootState, Services } from 'MyTypes';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import services from '../services';
import { routerMiddleware } from './redux-router';
import rootEpic from './root-epic';
import rootReducer from './root-reducer';
import { composeEnhancers } from './utils';

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

// configure middlewares
const middlewares = [epicMiddleware, routerMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(
  rootReducer,
  initialState,
  enhancer
);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
