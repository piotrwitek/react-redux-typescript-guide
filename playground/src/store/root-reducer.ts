import { combineReducers } from 'redux';

import countersReducer from '../features/counters/reducer';
import todosReducer from '../features/todos/reducer';
import { routerReducer } from './redux-router';

const rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer,
  counters: countersReducer,
});

export default rootReducer;
