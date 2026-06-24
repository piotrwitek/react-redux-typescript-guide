import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment as incrementCounter,
  decrement as decrementCounter,
} from '../features/counter/counterSlice';
import {
  addTodo as addTodoAction,
  toggleTodo as toggleTodoAction,
} from '../features/todos/todosSlice';
import {
  selectCount,
  selectCountLoading,
} from '../features/counter/counterSelectors';
import {
  selectTodos,
  selectTodosLoading,
} from '../features/todos/todosSelectors';
import { AppDispatch } from '../store';

const App: React.FC = () => {
  // Use selectors exported from feature modules
  const count = useSelector(selectCount);
  const countLoading = useSelector(selectCountLoading);
  const todos = useSelector(selectTodos);
  const todosLoading = useSelector(selectTodosLoading);

  const dispatch = useDispatch<AppDispatch>();

  const handleIncrement = () => dispatch(incrementCounter());
  const handleDecrement = () => dispatch(decrementCounter());

  const handleAddTodo = () => {
    const text = prompt('Enter todo text');
    if (text) {
      dispatch(addTodoAction(text));
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodoAction(id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React‑Redux‑TypeScript Playground</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Counter</h2>
        {countLoading ? (
          <p>Loading counter...</p>
        ) : (
          <>
            <p>Current count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
          </>
        )}
      </section>

      <section>
        <h2>Todos</h2>
        {todosLoading ? (
          <p>Loading todos...</p>
        ) : (
          <>
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  onClick={() => handleToggleTodo(todo.id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {todo.text}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
};

export default App;