import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// side-effect imports
// tslint:disable:no-import-side-effect
import './rxjs-imports';

import store from './store';
import { Home } from './pages';

const Root = (
  <Provider store={store}>
    <Home />
  </Provider>
);

render(Root, document.getElementById('root'));
