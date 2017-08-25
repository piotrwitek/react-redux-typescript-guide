import * as React from 'react';

import { withErrorBoundary } from './with-error-boundary';

const ErrorMessage: React.SFC<{ onReset: () => any }> = ({ onReset }) => {
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

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

export default (
  ({ children }) => (
    <ErrorMessageWithErrorBoundary>
      {children}
    </ErrorMessageWithErrorBoundary>
  )
) as React.SFC<{}>;
