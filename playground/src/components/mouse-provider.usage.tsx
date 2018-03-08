import * as React from 'react';

import { MouseProvider } from './mouse-provider';

export default () => (
  <MouseProvider
    render={mouse => (
      <p>The mouse position is {mouse.x}, {mouse.y}</p>
    )}
  />
);
