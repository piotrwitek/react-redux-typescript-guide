import { RootAction, RootState, Services } from 'MyTypes';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

// browser history
export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

const routerMiddleware = createRouterMiddleware(history);

// configure middlewares
const middlewares = [epicMiddleware, routerMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
