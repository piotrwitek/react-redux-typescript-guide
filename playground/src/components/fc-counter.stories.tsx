import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FCCounter } from '../components';

storiesOf('FCCounter', module).add('default', () => (
  <FCCounter
    label={'FCCounter'}
    count={0}
    onIncrement={action('onIncrement')}
  />
));
