import { combineEpics } from 'redux-observable';

import * as todosEpics from '../features/todos/epics';

export default combineEpics(...Object.values(todosEpics));
