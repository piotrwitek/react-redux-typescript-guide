import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './modules';
import { IRootState } from './modules';

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

function configureStore(initialState?: IRootState) {
  // configure middlewares
  const middlewares = [
    createEpicMiddleware(rootEpic),
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );
  // create store

  return createStore<IRootState>(
    rootReducer,
    initialState!,
    enhancer,
  );
}


const store = configureStore();

export default store;
