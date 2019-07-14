import React from 'react';
import { storiesOf } from '@storybook/react';

import { ClassCounterWithDefaultProps } from '../components';

storiesOf('ClassCounterWithDefaultProps', module)
  .add('with defaut initial count', () => (
    <ClassCounterWithDefaultProps label={'ClassCounterWithDefaultProps'} />
  ))
  .add('with initial count set', () => (
    <ClassCounterWithDefaultProps
      label={'ClassCounterWithDefaultProps'}
      initialCount={5}
    />
  ));
