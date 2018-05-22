import { combineEpics } from 'redux-observable';

import todos from '../features/todos/epics';

export default combineEpics(todos);
