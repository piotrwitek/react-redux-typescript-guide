import { combineEpics, Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs/Observable';
import { v4 } from 'uuid';

import { RootAction, RootState, allActions } from '@src/redux';
import { actions } from './';

const TOAST_LIFETIME = 2000;

const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(allActions.addTodo))
    .concatMap((action) => {
      const toast = { id: v4(), text: action.payload };

      const addToast$ = Observable.of(actions.addToast(toast));
      const removeToast$ = Observable.of(actions.removeToast(toast.id))
        .delay(TOAST_LIFETIME);

      return addToast$.concat(removeToast$);
    });

export const epics = combineEpics(addTodoToast);
