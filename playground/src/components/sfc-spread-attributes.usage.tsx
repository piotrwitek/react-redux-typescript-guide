import * as React from 'react';

import { SFCSpreadAttributes } from '../components';

export default () => (
  <SFCSpreadAttributes
    className={'classy'}
    style={{ backgroundColor: 'lightcyan' }}
  >
    {`I'll spread every property you give me!`}
  </SFCSpreadAttributes>
);
