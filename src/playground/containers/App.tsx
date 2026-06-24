import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { useSelector } from 'react-redux';
import { CounterFeatureSelectors } from './features/counter';
import { TodoFeatureSelectors } from './features/todo';

const App = () => {
  const counterValue = useSelector(CounterFeatureSelectors.selectCounterValue);
  const todoList = useSelector(TodoFeatureSelectors.selectTodoList);

  return (
    <Provider store={store}>
      <div>
        <h1>React Redux TypeScript Guide</h1>
        <h2>Counter Feature</h2>
        <p>Counter value: {counterValue}</p>
        <h2>Todo Feature</h2>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </Provider>
  );
};

export default App;