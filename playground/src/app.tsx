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


// Auto-generated fix
// src/components/ConnectedListExtended.tsx
import React from 'react';
import { connect } from 'react-redux';
import GenericList, { GenericListProps } from './GenericList';
import { RootState } from '../store'; // Adjust the import based on where your RootState interface is located

// Define the own props type
interface OwnProps {
  items: Array<any>; // Adjust the type as needed
}

// Map state to props
const mapStateToProps = (state: RootState) => ({
  items: state.someReducer.items, // Adjust according to your state structure
});

// Create a connected generic component
export const ConnectedListExtended = <T extends {}>(props: GenericListProps<T> & OwnProps) => {
  return <GenericList<T> {...props} />;
};

export default connect<GenericListProps<OwnProps>, {}, OwnProps>(mapStateToProps)(ConnectedListExtended);

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
