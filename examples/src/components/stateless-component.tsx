import * as React from 'react';

export type StatelessComponentProps = {
  className?: string,
  style?: React.CSSProperties,
  label: string,
  counter: number,
  incrementCounter: () => any,
};

export const StatelessComponent: React.StatelessComponent<StatelessComponentProps> = (props) => {
  const { children, label, counter, incrementCounter, ...restProps } = props;

  const handleIncrement = () => { incrementCounter(); };

  return (
    <div {...restProps} >
      <div>
        {label}: {counter}
        <button type="button" onClick={handleIncrement}>
          Increment
        </button>
      </div>
    </div>
  );
};

export default StatelessComponent;
