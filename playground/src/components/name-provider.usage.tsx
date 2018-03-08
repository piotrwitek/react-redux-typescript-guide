import * as React from 'react';

import { NameProvider } from './name-provider';

export default () => (
  <NameProvider>
    {({ name }) => (
      <div>{name}</div>
    )}
  </NameProvider>
);
