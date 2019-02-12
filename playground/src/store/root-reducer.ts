import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import todosReducer from '../features/todos/reducer';
import countersReducer from '../features/counters/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer,
  counters: countersReducer,
});

export default rootReducer;
