import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { useSelector } from 'react-redux';
import { Counter } from './features/counter/Counter';
import { TodoList } from './features/todo/TodoList';

const App: React.FC = () => {
  const counter = useSelector((state) => state.counter);
  const todos = useSelector((state) => state.todo);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Counter />
          <TodoList />
        </header>
      </div>
    </Provider>
  );
};

export default App;