import * as React from 'react';

import { withConnectedCount } from '../hoc';
import { FCCounter } from '../components';

const FCCounterWithConnectedCount = withConnectedCount(FCCounter);

export default () => (
  <FCCounterWithConnectedCount overrideCount={5} label={'FCCounterWithState'} />
);
