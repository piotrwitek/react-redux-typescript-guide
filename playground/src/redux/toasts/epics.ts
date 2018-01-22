import { combineEpics, Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs/Observable';
import { v4 } from 'uuid';

import { RootAction, RootState } from '@src/redux';
import { todosActions } from '@src/redux/todos';
import { toastsActions } from './';

const TOAST_LIFETIME = 2000;

const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(todosActions.addTodo))
    .concatMap((action) => { // action is type: { type: "ADD_TODO"; payload: string; }
      const toast = { id: v4(), text: action.payload };

      const addToast$ = Observable.of(toastsActions.addToast(toast));
      const removeToast$ = Observable.of(toastsActions.removeToast(toast.id))
        .delay(TOAST_LIFETIME);

      return addToast$.concat(removeToast$);
    });

export const epics = combineEpics(addTodoToast);
