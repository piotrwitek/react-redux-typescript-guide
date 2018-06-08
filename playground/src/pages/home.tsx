import * as React from 'react';

import SFCCounter from '../components/sfc-counter.usage';
import SFCSpreadAttributes from '../components/sfc-spread-attributes.usage';
import StatefulCounter from '../components/stateful-counter.usage';
import StatefulCounterWithInitialCount from '../components/stateful-counter-with-default.usage';
import UserListUsage from '../components/generic-list.usage';

export const Home = () => {
  return (
    <section>
      <SFCCounter />
      <SFCSpreadAttributes />
      <StatefulCounter />
      <StatefulCounterWithInitialCount />
      <UserListUsage />
    </section>
  );
};
