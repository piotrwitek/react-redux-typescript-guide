import * as React from 'react';

interface CounterProps {
  initialCount: number;
}

export default function Counter({initialCount}: CounterProps) {
  const [count, setCount] = React.useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}
