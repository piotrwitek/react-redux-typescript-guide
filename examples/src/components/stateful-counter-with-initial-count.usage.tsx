import * as React from 'react';

import { StatefulCounterWithInitialCount } from '@src/components';

export default () => (
  <StatefulCounterWithInitialCount
    label={'StatefulCounter'}
    initialCount={10}
  />
);
