import * as React from 'react';
import { Todo } from '../features/todos/models';
import { todosSelectors } from '../features/todos';

import { createConnectedGenericList } from '.';

const TodoList = createConnectedGenericList<Todo>();

export const GenericListConnectedUsage = () => (
  <TodoList
    selectItems={state => todosSelectors.getTodos(state.todos)}
    itemRenderer={todo => (
      <div key={todo.id}>
        {todo.completed ? 'done' : 'todo'}: {todo.title}
      </div>
    )}
  />
);

export default GenericListConnectedUsage;
