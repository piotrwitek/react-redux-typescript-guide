import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { isOfType } from 'typesafe-actions';

import { RootState } from '../../store';
import { ADD } from '../todos/types';

const TOAST_LIFETIME = 2000;

const addTodoToast: Epic<RootAction, RootState> = (action$, store) =>
  action$.filter(isOfType(todosActions.add)).concatMap(action => {
    // action is type: { type: "ADD_TODO"; payload: string; }

    const addToast$ = Observable.of(toastsActions.addToast(toast));
    const removeToast$ = Observable.of(
      toastsActions.removeToast(toast.id)
    ).delay(TOAST_LIFETIME);

    return addToast$.concat(removeToast$);
  });

export default combineEpics(addTodoToast);
