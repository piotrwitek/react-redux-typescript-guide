import * as React from 'react';

export const ErrorMessage: React.SFC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <div>
      <h2>{`Sorry there was an unexpected error`}</h2>
      {`To continue: `}
      <a onClick={() => { onReset(); }}>
        {`go to home page`}
      </a>
    </div>
  );
};
