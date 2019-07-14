import React from 'react';
import { storiesOf } from '@storybook/react';

import { MouseProvider } from '../components';

storiesOf('MouseProvider', module).add('default', () => (
  <MouseProvider
    render={mouse => (
      <p>
        The mouse position is {mouse.x}, {mouse.y}
      </p>
    )}
  />
));
