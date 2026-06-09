import * as React from 'react';

import { FCCounter } from '../components';
import { withRecomposeStateHandlers } from '../hoc';

const FCCounterWithRecomposeStateHandlers = withRecomposeStateHandlers(FCCounter);

export default () => (
  <FCCounterWithRecomposeStateHandlers
    label={'FCCounterWithRecomposeStateHandlers'}
    initialCount={3}
  />
);
