```typescript
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../src/reducers';
import { useSelector } from 'react-redux';
import { CounterFeature } from '../src/features/counter';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const isCounterVisible = useSelector((state) => state.counter.isVisible);

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <p>Is Counter Visible: {isCounterVisible.toString()}</p>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
```