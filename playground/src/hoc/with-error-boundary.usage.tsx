import * as React from 'react';
import {useState} from 'react';

import { withErrorBoundary } from '../hoc';
import { ErrorMessage } from '../components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

const BrokenButton = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Catch me!');
  }

  return (
    <button
      type="button"
      onClick={() => {
        // We don't just throw the error here, because error boundaries
        // only catch errors thrown by render and lifecycle methods. Read more:
        // https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers
        setThrowError(true);
      }}
    >
      {`Throw nasty error`}
    </button>
  );
};

export default () => (
  <ErrorMessageWithErrorBoundary>
    <BrokenButton />
  </ErrorMessageWithErrorBoundary>
);
