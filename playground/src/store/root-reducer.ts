import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { countersReducer } from '../features/counters';

const rootReducer = combineReducers({
  router: routerReducer,
  counters: countersReducer,
});

export default rootReducer;
