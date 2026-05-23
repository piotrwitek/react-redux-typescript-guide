import Types from 'MyTypes';
import { connect } from 'react-redux';

import { todosActions, todosSelectors } from '../features/todos';

// ── Minimal presentational component for the example ─────────────────────────
import * as React from 'react';
import { Todo } from '../features/todos/models';

type Props = {
  filteredTodos: Todo[];
  filter: string;
  onComplete: (id: string) => void;
};

export const TodoList: React.FC<Props> = ({ filteredTodos, filter, onComplete }) => (
  <div>
    <p>Filter: {filter}</p>
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id} onClick={() => onComplete(todo.id)}>
          {todo.title} {todo.completed ? '✓' : ''}
        </li>
      ))}
    </ul>
  </div>
);

// ── mapStateToProps using root-level selectors ────────────────────────────────
// selectFilteredTodos and selectTodosFilter both accept RootState directly —
// no need to extract state.todos in the component.
const mapStateToProps = (state: Types.RootState) => ({
  filteredTodos: todosSelectors.selectFilteredTodos(state),
  filter: todosSelectors.selectTodosFilter(state),
});

const mapDispatchToProps = {
  onComplete: todosActions.toggleTodo,
};

export const TodoListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
