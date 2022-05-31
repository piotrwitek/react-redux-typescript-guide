import * as React from 'react';

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};

// React.FC is unaplicable here due not working properly with default props
// https://github.com/facebook/create-react-app/pull/8177
export const FCCounterWithDefaultProps = (props: Props): JSX.Element => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    onIncrement();
  };

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

FCCounterWithDefaultProps.defaultProps = { count: 5 };
