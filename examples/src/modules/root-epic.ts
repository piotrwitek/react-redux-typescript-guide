import { combineEpics } from 'redux-observable';

import { epics as todos } from './todos/epics';

export const rootEpic = combineEpics(
  todos,
);
