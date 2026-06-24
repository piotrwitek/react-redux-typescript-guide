import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { counterSelector } from '../features/counter/counterSlice';
import { todosSelector } from '../features/todos/todosSlice';

const App = () => {
  const counter = useSelector(counterSelector);
  const todos = useSelector(todosSelector);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Counter: {counter.value}
        </p>
        <p>
          Todos: {todos.length}
        </p>
      </header>
    </div>
  );
};

export default App;