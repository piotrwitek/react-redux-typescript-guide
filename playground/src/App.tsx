```typescript
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { Counter } from './features/counter/Counter';
import { User } from './features/user/User';
import counterReducer from './features/counter/counterSlice';
import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const App: React.FC = () => {
  const count = useSelector((state) => state.counter.count);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>Count: {count}</p>
          <p>Username: {username}</p>
          <Counter />
          <User />
        </header>
      </div>
    </Provider>
  );
};

export default App;
```