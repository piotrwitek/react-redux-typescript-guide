import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../reducers';
import { useSelector } from 'react-redux';
import { CounterFeature } from '../features/counter/counterSlice';
import { TodoFeature } from '../features/todo/todoSlice';

const store = createStore(rootReducer);

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  return (
    <div>
      <h1>Counter: {counter.value}</h1>
    </div>
  );
};

const TodoList = () => {
  const todos = useSelector((state) => state.todo);
  return (
    <div>
      <h1>Todo List:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Counter />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;