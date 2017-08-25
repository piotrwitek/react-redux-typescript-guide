import * as React from 'react';

import { withState } from '../hoc';
import { SFCCounter } from '../components';

const SFCCounterWithState =
  withState(SFCCounter);

export default (
  ({ children }) => (
    <SFCCounterWithState label={'SFCCounterWithState'} />
  )
) as React.SFC<{}>;
