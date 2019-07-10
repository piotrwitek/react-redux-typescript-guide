import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import todosReducer from '../features/todos/reducer';
import countersReducer from '../features/counters/reducer';

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  todos: todosReducer,
  counters: countersReducer,
});

export default rootReducer;
