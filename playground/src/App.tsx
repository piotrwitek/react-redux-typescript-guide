import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { useSelector } from 'react-redux';
import { CounterFeatureSelectors } from './features/counter/counterSelectors';

const store = createStore(rootReducer);

function App() {
  const counterValue = useSelector(CounterFeatureSelectors.selectCount);
  const isCounterEnabled = useSelector(CounterFeatureSelectors.selectIsCounterEnabled);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Counter value: {counterValue}
        </p>
        <p>
          Counter enabled: {isCounterEnabled ? 'Yes' : 'No'}
        </p>
      </header>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}