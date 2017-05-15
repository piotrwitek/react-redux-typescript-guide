import * as React from 'react';
import { render } from 'react-dom';

import { ConnectedComponent } from './containers';

render(
  <ConnectedComponent label="Primary" />,
  document.getElementById('app'),
);
