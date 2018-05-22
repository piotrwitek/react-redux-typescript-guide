import { combineEpics, Epic } from 'redux-observable';

import { RootAction, RootState, Services } from '@src/store';
import { saveState } from '@src/services/local-storage-service';

const SAVING_DELAY = 1000;

// persist state in local storage every 1s
const saveStateInLocalStorage: Epic<RootAction, RootState> = (action$, store) => action$
  .debounceTime(SAVING_DELAY)
  .do((action) => {
    // handle side-effects
    saveState(store.getState());
  })
  .ignoreElements();

export const epics = combineEpics(
  saveStateInLocalStorage
);
