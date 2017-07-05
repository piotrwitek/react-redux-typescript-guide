import { v4 } from 'uuid';
import { Observable } from 'rxjs/Observable';
import { combineEpics, Epic } from 'redux-observable';

import { IRootAction, IRootState } from '@src/redux';
import { ADD_TODO, IActions } from '@src/redux/todos';
import { actionCreators } from './';

const TOAST_LIFETIME = 2000;

// Epics - handling side effects of actions
const addTodoToast: Epic<IRootAction, IRootState> =
  (action$, store) => action$
    .ofType(ADD_TODO)
    .concatMap((action: IActions[typeof ADD_TODO]) => {
      const toast = { id: v4(), text: action.payload };

      const addToast$ = Observable.of(actionCreators.addToast(toast));
      const removeToast$ = Observable.of(actionCreators.removeToast(toast.id))
        .delay(TOAST_LIFETIME);

      return addToast$.concat(removeToast$);
    });

export const epics = combineEpics(addTodoToast);
