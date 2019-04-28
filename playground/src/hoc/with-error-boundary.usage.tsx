import React, {useState} from 'react';

import { withErrorBoundary } from '../hoc';
import { ErrorMessage } from '../components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

const BrokenComponent = () => {
  throw new Error('I\'m broken! Don\'t render me.');
};

const BrokenButton = () => {
  const [shouldRenderBrokenComponent, setShouldRenderBrokenComponent] =
    useState(false);

  if (shouldRenderBrokenComponent) {
    return <BrokenComponent />;
  }

  return (
    <button
      type="button"
      onClick={() => {
        setShouldRenderBrokenComponent(true);
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
