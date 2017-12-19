import * as React from 'react';

import { withErrorBoundary } from '@src/hoc';
import { ErrorMessage } from '@src/components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

const ErrorThrower = () => (
  <button type="button" onClick={() => { throw new Error(`Catch this!`); }}>
    {`Throw nasty error`}
  </button >
);

export default (() => (
  <ErrorMessageWithErrorBoundary>
    <ErrorThrower />
  </ErrorMessageWithErrorBoundary>
)) as React.SFC<{}>;
