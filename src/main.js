import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeRoutes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import ApiClient from 'helpers/ApiClient';
import fetchData from 'helpers/fetchData';

if (__DEBUG__) {
  const Immutable = require('immutable');
  const installDevTools = require('immutable-devtools');
  installDevTools(Immutable);
}

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

addLocaleData(en);
addLocaleData(es);
addLocaleData(fr);

function start() {
  const initialState = window.__INITIAL_STATE__;

  // Create redux store and sync with react-router-redux. We have installed the
  // react-router-redux reducer under the key "router" in src/routes/index.js,
  // so we need to provide a custom `selectLocationState` to inform
  // react-router-redux of its location.
  const client = new ApiClient();
  const store = configureStore(initialState, browserHistory, client);
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router,
  });

  // Now that we have the Redux store, we can create our routes. We provide
  // the store to the route definitions so that routes have access to it for
  // hooks such as `onEnter`.
  const routes = makeRoutes(store);

  // Listen for route changes on the browser history instance:
  history.listenBefore((location, callback) => {
    // load non-deferred data
    fetchData(store, routes, location, callback);
  });

  // Listen for route changes on the browser history instance:
  history.listen(location => {
    // load deferred data
    fetchData(store, routes, location);
  });

  // Render the React application to the DOM
  ReactDOM.render(
    <Root history={history} routes={routes} store={store} />,
    document.getElementById('root')
  );
}

// All modern browsers, expect `Safari`, have implemented
// the `ECMAScript Internationalization API`.
// For that we need to patch in on runtime.
if (!global.Intl) {
  require.ensure(['intl'], require => {
    require('intl');
    start();
  }, 'IntlBundle');
} else {
  start();
}
