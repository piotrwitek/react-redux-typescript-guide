import React from 'react';
import { Provider } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ReduxRouter } from '@lagunovsky/redux-react-router'

import { Layout } from './layout/layout';
import { LayoutFooter } from './layout/layout-footer';
import { LayoutHeader } from './layout/layout-header';
import { Home } from './routes/home';
import { NotFound } from './routes/not-found';
import { history, store } from './store';

export function App() {
  return (
    <Provider store={store}>
      <ReduxRouter history={history} store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  renderHeader={() => <LayoutHeader />}
                  renderFooter={() => <LayoutFooter />}
                  renderContent={() => <Outlet />}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </ReduxRouter>
    </Provider>
  );
}
