import { action } from '@storybook/addon-actions';
import * as React from 'react';

import { FCCounterWithDefaultProps } from '.';

export default () => (
  <FCCounterWithDefaultProps
    label={'FCCounterWithDefaultProps'}
    onIncrement={action('onIncrement')}
  />
);
