import * as todosActions from '../features/todos/actions';
import * as countersActions from '../features/counters/actions';
import { routerActions } from '@lagunovsky/redux-react-router'

export default {
  router: routerActions,
  todos: todosActions,
  counters: countersActions,
};
