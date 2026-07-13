import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connectGenericList } from './connected-generic-list';
import { RootState } from '../store/types';

// Example domain type
interface Todo {
  id: number;
  text: string;
}

// Example Redux state shape
interface ExampleState {
  todos: Todo[];
}

// Example reducer
function rootReducer(
  state: ExampleState = { todos: [] },
  action: any
): ExampleState {
  return state;
}

// Create a store for demonstration
const store = createStore(rootReducer);

// Map state to props for Todo items
const mapStateToProps = (state: RootState) => ({
  items: (state as any as ExampleState).todos,
});

// Create a connected generic list typed for Todo
export const ConnectedTodoList = connectGenericList<Todo>(mapStateToProps);

// Usage example
export const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedTodoList
      itemRenderer={(todo: Todo) => (
        <span key={todo.id}>{todo.text}</span>
      )}
    />
  </Provider>
);
