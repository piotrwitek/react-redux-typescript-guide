import * as React from 'react';
import { render } from 'react-dom';

import { StatelessComponent, ClassComponent } from './components';
import { ConnectedStatelessComponent } from './containers';

export const App = (
  <div>
    <ClassComponent label="ClassComponent" initialCount={10} />
    <ConnectedStatelessComponent label="ConnectedStatelessComponent" />
  </div>
);
