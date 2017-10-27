import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// tslint:disable:no-import-side-effect
// side-effect imports
import './rxjs-imports';
// tslint:enable:no-import-side-effect

import store from './store';
import {
  Home,
} from './containers';

const Root = (
  <Provider store={store}>
    <Home />
  </Provider>
);

render(Root, document.getElementById('root'));
