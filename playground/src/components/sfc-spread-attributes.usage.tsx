import * as React from 'react';

import { SFCSpreadAttributes } from '@src/components';

export default (() => (
  <SFCSpreadAttributes
    className={'classy'}
    style={{ backgroundColor: 'lightcyan' }}
  >
    {`I'll spread every property you give me!`}
  </SFCSpreadAttributes>
)) as React.SFC<{}>;
