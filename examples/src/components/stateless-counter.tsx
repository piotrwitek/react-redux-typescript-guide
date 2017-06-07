import * as React from 'react';

export interface IStatelessCounterProps {
  label: string,
  counter: number,
  incrementCounter: () => any,
}

export const StatelessCounter: React.StatelessComponent<IStatelessCounterProps> = (props) => {
  const { label, counter, incrementCounter } = props;

  const handleIncrement = () => { incrementCounter(); };

  return (
    <div>
      {label}: {counter}
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
};
