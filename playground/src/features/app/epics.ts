import Types from 'Types';
import { combineEpics, Epic } from 'redux-observable';
import { debounceTime, tap, ignoreElements } from 'rxjs/operators';

import { saveState } from '../../services/local-storage-service';

const SAVING_DELAY = 1000;

// persist state in local storage every 1s
const saveStateInLocalStorage: Epic<Types.RootAction, Types.RootState> = (
  action$,
  store
) =>
  action$.pipe(
    debounceTime(SAVING_DELAY),
    tap(action => {
      // handle side-effects
      saveState(store.getState());
    }),
    ignoreElements()
  );

export const epics = combineEpics(saveStateInLocalStorage);
