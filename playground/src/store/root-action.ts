import { todosActions } from '../features/todos';
import { countersActions } from '../features/counters';
import { routerActions } from '@lagunovsky/redux-react-router'

export default {
  router: routerActions,
  todos: todosActions,
  counters: countersActions,
};
