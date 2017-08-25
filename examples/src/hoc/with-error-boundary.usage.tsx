import * as React from 'react';

import { withErrorBoundary } from '@src/hoc';
import { ErrorMessage } from '@src/components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

export default (
  ({ children }) => (
    <ErrorMessageWithErrorBoundary>
      {children}
    </ErrorMessageWithErrorBoundary>
  )
) as React.SFC<{}>;
