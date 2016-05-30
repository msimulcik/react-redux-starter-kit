import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import clientMiddleware from 'middlewares/clientMiddleware';

export default (initialState = {}, history, client) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, clientMiddleware(client), routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    ),
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(reducers);
    });
  }

  return store;
};
