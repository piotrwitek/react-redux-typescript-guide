import { createBrowserHistory } from 'history';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router'

export const history = createBrowserHistory();
export const routerReducer = createRouterReducer(history);
export const routerMiddleware = createRouterMiddleware(history)
