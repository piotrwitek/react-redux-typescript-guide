import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { useSelector } from 'react-redux';
import { CounterFeature } from './features/counter/counterSlice';
import { TodoFeature } from './features/todo/todoSlice';

const store = createStore(rootReducer, composeWithDevTools());

const Counter = () => {
  const counterValue = useSelector((state) => state.counter.value);
  return <div>Counter: {counterValue}</div>;
};

const Todo = () => {
  const todoList = useSelector((state) => state.todo.list);
  return <div>Todo List: {todoList.join(', ')}</div>;
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Counter />
        <Todo />
      </div>
    </Provider>
  );
};

export default App;