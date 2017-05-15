import * as React from 'react';

type Props = {
  className?: string,
  style?: React.CSSProperties,
  label: string,
  counter: number,
  incrementCounter: () => void,
};

export const StatelessComponent: React.StatelessComponent<Props> = (props) => {
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
      <hr />
      {children}
    </div>
  );
};

export default StatelessComponent;
