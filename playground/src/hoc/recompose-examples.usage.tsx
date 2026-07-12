import * as React from 'react';

import { RecomposeCounter, RecomposeToggle } from './recompose-examples';

export default () => (
  <>
    <RecomposeCounter title="Recompose counter" initialCount={3} step={2} />
    <RecomposeToggle label="Show details" initiallyOpen />
  </>
);
