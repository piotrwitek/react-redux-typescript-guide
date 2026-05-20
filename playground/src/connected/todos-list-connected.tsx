import Types from 'MyTypes';
import * as React from 'react';
import { connect } from 'react-redux';

import { todosActions, todosSelectors } from '../features/todos';
import { TodosFilter } from '../features/todos/models';

const mapStateToProps = (state: Types.RootState) => ({
  todos: todosSelectors.getFilteredTodos(state.todos),
  filter: todosSelectors.getTodosFilter(state.todos),
});

const dispatchProps = {
  onAdd: todosActions.add,
  onToggle: todosActions.toggle,
  onChangeFilter: todosActions.changeFilter,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const TodosList: React.FC<Props> = ({
  todos,
  filter,
  onAdd,
  onToggle,
  onChangeFilter,
}) => {
  const [title, setTitle] = React.useState('');

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const nextTitle = title.trim();

    if (!nextTitle) {
      return;
    }

    onAdd(nextTitle);
    setTitle('');
  };

  return (
    <section>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          aria-label="Todo title"
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>
      <select
        value={filter}
        onChange={event => onChangeFilter(event.target.value as TodosFilter)}
        aria-label="Todo filter"
      >
        <option value={TodosFilter.All}>All</option>
        <option value={TodosFilter.Active}>Active</option>
        <option value={TodosFilter.Completed}>Completed</option>
      </select>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <button
              type="button"
              onClick={() => onToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const TodosListConnected = connect(
  mapStateToProps,
  dispatchProps
)(TodosList);
