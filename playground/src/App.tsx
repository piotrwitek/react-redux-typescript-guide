import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import Home from './routes/Home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Home />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
