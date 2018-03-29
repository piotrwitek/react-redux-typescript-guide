import * as React from 'react';

import { withErrorBoundary } from '@src/hoc';
import { ErrorMessage } from '@src/components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

const BrokenButton = () => (
  <button type="button" onClick={() => { throw new Error(`Catch me!`); }}>
    {`Throw nasty error`}
  </button >
);

export default (() => (
  <ErrorMessageWithErrorBoundary  >
    <BrokenButton />
  </ErrorMessageWithErrorBoundary>
)) as React.SFC<{}>;
