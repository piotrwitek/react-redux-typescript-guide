import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { ConnectedTodoList, Todo } from './generic-list-connected';

/** Store Setup */
type StoreState = {
  readonly todos: Todo[];
};

const initialState: StoreState = {
  todos: [
    { id: 1, title: 'Learn TypeScript', completed: true },
    { id: 2, title: 'Read react-redux-typescript-guide', completed: false },
    { id: 3, title: 'Build something great', completed: false },
  ],
};

function reducer(state: StoreState = initialState): StoreState {
  return state;
}

const store = createStore(reducer);

/** Item Renderer */
const todoItemRenderer = (item: Todo): JSX.Element => (
  <span>
    [{item.completed ? 'x' : ' '}] {item.title}
  </span>
);

/** Usage */
export const App: React.FC = () => (
  <Provider store={store}>
    {/* `items` is injected by connect; only `itemRenderer` needs to be supplied */}
    <ConnectedTodoList itemRenderer={todoItemRenderer} />
  </Provider>
);
