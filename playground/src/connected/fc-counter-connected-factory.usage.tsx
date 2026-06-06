import * as React from 'react';

import { FCCounterConnectedFactory } from './fc-counter-connected-factory';

export default (
  <div>
    <FCCounterConnectedFactory label="Counter A" initialCount={10} />
    <FCCounterConnectedFactory label="Counter B" initialCount={20} />
  </div>
);
