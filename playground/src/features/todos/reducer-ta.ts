import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import { ADD, CHANGE_FILTER, TOGGLE } from './constants';

export type TodosState = Readonly<{
  todos: Todo[];
  todosFilter: TodosFilter;
}>;
const initialState: TodosState = {
  todos: [],
  todosFilter: TodosFilter.All,
};

const todos = createReducer(initialState.todos)
  .handleType(ADD, (state, action) => [...state, action.payload])
  .handleType(TOGGLE, (state, action) =>
    state.map(item =>
      item.id === action.payload
        ? { ...item, completed: !item.completed }
        : item
    )
  );

const todosFilter = createReducer(initialState.todosFilter).handleType(
  CHANGE_FILTER,
  (state, action) => action.payload
);

export default combineReducers({
  todos,
  todosFilter,
});
