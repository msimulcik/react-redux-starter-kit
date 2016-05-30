import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import ApiClient from 'helpers/ApiClient';
import fetchData from 'helpers/fetchData';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import createRoutes from './routes/index';
import { RedBox } from 'redbox-react';

if (__DEBUG__) {
  installDevTools(Immutable);
}

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

addLocaleData(en);
addLocaleData(es);
addLocaleData(fr);

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.__INITIAL_STATE__;
const client = new ApiClient();
const store = createStore(initialState, browserHistory, client);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

const routes = createRoutes(store);

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

const hookForFetchData = () => {
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
};

let render = (routerKey = null) => {
  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  );
};

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };
  render = () => {
    try {
      renderApp(Math.random());
    } catch (error) {
      renderError(error);
    }
  };
  module.hot.accept(['./routes/index'], () => render());
}

// ========================================================
// Go!
// ========================================================

// All modern browsers, expect `Safari`, have implemented
// the `ECMAScript Internationalization API`.
// For that we need to patch in on runtime.
if (!global.Intl) {
  require.ensure(['intl'], require => {
    require('intl');
    hookForFetchData();
    render();
  }, 'IntlBundle');
} else {
  hookForFetchData();
  render();
}
