import * as React from 'react';

import {
  SFCCounter,
  StatefulCounter,
  StatefulCounterWithInitialCount
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

      <StatefulCounter
        label="ClassCounter"
      />

      <StatefulCounterWithInitialCount
        label="ClassCounter"
      />
    </section>
  );
}
