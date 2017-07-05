import * as React from 'react';

import {
  SFCCounter,
  SFCCounterConnected,
  SFCCounterConnectedConcise,
  StatefulCounter,
} from '../components';

let count = 0;
const increment = () => { count++; };

export const Home = () => (
  <section>
    <SFCCounter
      label="StatelessCounter"
      count={count}
      onIncrement={increment}
    />
    <SFCCounterConnected
      label="ConnectedStatelessCounter"
    />
    <SFCCounterConnectedConcise
      label="ConnectedStatelessCounter" // error without -> <link>
    />
    <StatefulCounter
      label="ClassCounter"
      initialCount={10}
    />
  </section>
);
