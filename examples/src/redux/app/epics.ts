import { combineEpics, Epic } from 'redux-observable';

import { IRootAction, RootState } from '@src/redux';
import { saveState } from '@src/services/local-storage-service';

const SAVING_DELAY = 1000;

// persist state in local storage every 1s
const saveStateInLocalStorage: Epic<IRootAction, RootState> = (action$, store) => action$
  .debounceTime(SAVING_DELAY)
  .do((action: IRootAction) => {
    // handle side-effects
    saveState(store.getState());
  })
  .ignoreElements();

export const epics = combineEpics(
  saveStateInLocalStorage,
);
