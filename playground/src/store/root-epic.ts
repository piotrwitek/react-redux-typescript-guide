import { combineEpics } from 'redux-observable';

import { todosEpics } from '../features/todos';

export default combineEpics(...Object.values(todosEpics));
