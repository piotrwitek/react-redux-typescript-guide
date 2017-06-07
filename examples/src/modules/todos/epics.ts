import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { combineEpics, Epic } from 'redux-observable';

import { ADD_TODO, IActions, actionCreators } from '../todos';
import { IRootAction, IRootState } from '../../modules';

// Epics - handling side effects of actions
const addTodoToast: Epic<IRootAction, IRootState> = (action$, store) =>
  action$
    .ofType(ADD_TODO)
    .map((action: IActions[typeof ADD_TODO]) => actionCreators.displayToast(action.payload));

export const epics = combineEpics(addTodoToast);
