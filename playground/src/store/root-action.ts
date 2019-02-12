import { routerActions } from 'react-router-redux';
import * as todosActions from '../features/todos/actions';
import * as countersActions from '../features/counters/actions';

export default {
  router: routerActions,
  todos: todosActions,
  counters: countersActions,
};
