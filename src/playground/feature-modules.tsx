import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CounterFeatureState } from './counter/counter.feature';
import { TodoFeatureState } from './todo/todo.feature';

const CounterFeatureSelectors = {
  selectCounterValue: (state: RootState) => state.counter.value,
};

const TodoFeatureSelectors = {
  selectTodoList: (state: RootState) => state.todo.list,
};

const FeatureModules = () => {
  const counterValue = useSelector(CounterFeatureSelectors.selectCounterValue);
  const todoList = useSelector(TodoFeatureSelectors.selectTodoList);

  return (
    <div>
      <h2>Feature Modules</h2>
      <p>Counter value: {counterValue}</p>
      <p>Todo list: {todoList.join(', ')}</p>
    </div>
  );
};

export default FeatureModules;