import * as React from 'react';

import { ConnectedStatelessCounter, ClassCounter } from '../components';

export const Home = () => (
  <section>
    <ClassCounter label="ClassCounter" initialCount={10} />
    <ConnectedStatelessCounter label="ConnectedStatelessCounter" />
  </section>
);
