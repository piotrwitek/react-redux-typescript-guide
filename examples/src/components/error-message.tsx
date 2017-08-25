import * as React from 'react';

export const ErrorMessage: React.SFC<{ onReset: () => any }> = ({ onReset }) => {
  const handleReset = () => {
    onReset();
    // TODO: switch location with router
  }

  return (
    <div>
      <h2>{`Sorry there was an unexpected error`}</h2>
      {`To continue: `}
      <a onClick={handleReset}>
        {`go to home page`}
      </a>
    </div>
  );
};
