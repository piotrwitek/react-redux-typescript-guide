import React from 'react';
import { storiesOf } from '@storybook/react';

import { FCSpreadAttributes } from '../components';

storiesOf('FCSpreadAttributes', module).add('default', () => (
  <FCSpreadAttributes
    className={'classy'}
    style={{ backgroundColor: 'lightcyan' }}
  >
    {`I'll spread every property you give me!`}
  </FCSpreadAttributes>
));
