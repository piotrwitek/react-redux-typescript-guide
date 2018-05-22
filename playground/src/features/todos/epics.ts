// tslint:disable:no-console
import Types from 'Types';
import { combineEpics, Epic } from 'redux-observable';
import { tap, ignoreElements, filter } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { todosConstants, TodosAction } from '../todos';

// contrived example!!!
const logAddAction: Epic<TodosAction, Types.RootState, Types.Services> = (
  action$,
  store
) =>
  action$.pipe(
    filter(isOfType(todosConstants.ADD)), // action is narrowed to: { type: "ADD_TODO"; payload: string; }
    tap(action => {
      console.log(
        `action type must be equal: ${todosConstants.ADD} === ${action.type}`
      );
    }),
    ignoreElements()
  );

export default combineEpics(logAddAction);
