import * as React from 'react';

import { FCCounterConnectedFactory } from './fc-counter-connected-factory';

const FCCounterConnectedFactoryUsage: React.FC = () => (
  <FCCounterConnectedFactory label="Factory props" initialCount={10} />
);

export default FCCounterConnectedFactoryUsage;