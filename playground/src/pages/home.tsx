import * as React from 'react';

import SFCCounter from '@src/components/sfc-counter.usage';
import SFCSpreadAttributes from '@src/components/sfc-spread-attributes.usage';
import StatefulCounter from '@src/components/stateful-counter.usage';
import StatefulCounterWithInitialCount from '@src/components/stateful-counter-with-default.usage';
import UserListUsage from '@src/components/generic-list.usage';

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
