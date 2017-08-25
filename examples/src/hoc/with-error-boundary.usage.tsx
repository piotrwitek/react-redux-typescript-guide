import * as React from 'react';

import { withErrorBoundary } from './with-error-boundary';
import { ErrorMessage } from '../components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

export default (
  ({ children }) => (
    <ErrorMessageWithErrorBoundary>
      {children}
    </ErrorMessageWithErrorBoundary>
  )
) as React.SFC<{}>;
