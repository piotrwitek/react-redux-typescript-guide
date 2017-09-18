import * as React from 'react';

import { SFCCounter } from '@src/components';

let count = 0;
const incrementCount = () => count++;

export default () => (
  <SFCCounter
    label={'SFCCounter'}
    count={count}
    onIncrement={incrementCount}
  />
);
