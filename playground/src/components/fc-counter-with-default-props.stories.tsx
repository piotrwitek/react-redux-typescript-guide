
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FCCounterWithDefaultProps } from '.';

storiesOf('FCCounterWithDefaultProps', module).add('default', () => (
  <FCCounterWithDefaultProps
    label={'FCCounterWithDefaultProps'}
    onIncrement={action('onIncrement')}
  />
));
