import { match } from 'react-router';
import { trigger } from 'redial';

export default function fetchData(store, routes, location, callback) {
  // Match routes based on location object:
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // Get array of route handler components:
    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch: store.dispatch,
    };

    if (callback) {
      // Don't fetch data for initial route, server has already done the work:
      if (window.__INITIAL_STATE__) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.__INITIAL_STATE__;
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals).then(callback);
      }
    } else {
      trigger('defer', components, locals);
    }
  });
}
