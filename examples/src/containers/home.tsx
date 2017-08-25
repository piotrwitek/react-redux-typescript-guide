import * as React from 'react';

import {
  SFCCounter,
  SFCCounterConnected,
  SFCCounterConnectedConcise,
  StatefulCounter,
} from '../components';

export const Home = () => {
  let count = 0;
  const increment = () => { count++; };

  return (
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
        label="ConnectedStatelessCounter"
      />
      <StatefulCounter
        label="ClassCounter"
        initialCount={10}
      />
    </section>
  );
}
