import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';

import { FCCounterConnectedOwnProps as ConnectedCounter } from './fc-counter-connected-own-props';

const reducer = combineReducers({
  counters: combineReducers({
    reduxCounter: (state: number = 0, action: any) => {
      switch (action.type) {
        case 'counters/INCREMENT':
          return state + 1; // action: { type: "INCREMENT"; }

        default:
          return state;
      }
    },
  }),
});

afterEach(cleanup);

test('can render with redux with defaults', () => {
  const label = 'Counter 1';
  renderWithRedux(<ConnectedCounter label={label} />);

  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText(RegExp(label)).textContent).toBe(label + ': 1');
});

test('can render with redux with custom initial state', () => {
  const label = 'Counter 1';
  renderWithRedux(<ConnectedCounter label={label} />, {
    initialState: { counters: { reduxCounter: 3 } },
  });
  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText(RegExp(label)).textContent).toBe(label + ': 4');
});

// TODO: move to external utils
// Redux Provider utility
function renderWithRedux(
  jsx: JSX.Element,
  options: { initialState?: object } = {}
) {
  const store = createStore(reducer, options.initialState);
  const view = render(<Provider store={store}>{jsx}</Provider>);

  return {
    view,
    store,
  };
}
