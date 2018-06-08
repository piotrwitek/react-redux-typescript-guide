import * as React from 'react';

import { withState } from '../hoc';
import { SFCCounter } from '../components';

const SFCCounterWithState =
  withState(SFCCounter);

export default () => (
  <SFCCounterWithState label={'SFCCounterWithState'} />
);
