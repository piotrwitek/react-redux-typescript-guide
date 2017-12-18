import * as React from 'react';

import { withState } from '@src/hoc';
import { SFCCounter } from '@src/components';

const SFCCounterWithState =
  withState(SFCCounter);

export default (
  () => (
    <SFCCounterWithState label={'SFCCounterWithState'} />
  )
) as React.SFC<{}>;
