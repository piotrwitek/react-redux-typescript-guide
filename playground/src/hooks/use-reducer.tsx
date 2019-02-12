import * as React from 'react';

interface State {
  count: number;
}

type Action = { type: 'reset' } | { type: 'increment' } | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

interface CounterProps {
  initialCount: number;
}

function Counter({ initialCount }: CounterProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    count: initialCount,
  });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}

export default Counter;
