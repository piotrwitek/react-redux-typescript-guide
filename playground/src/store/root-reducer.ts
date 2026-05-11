import { combineReducers } from 'redux';

import { countersReducer } from '../features/counters';
import { todosReducer } from '../features/todos';
import { routerReducer } from './redux-router';

const rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer,
  counters: countersReducer,
});

export default rootReducer;
