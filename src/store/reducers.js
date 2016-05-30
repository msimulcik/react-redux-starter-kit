import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import locale from '../modules/locale';

export const makeRootReducer = (asyncReducers) =>
  combineReducers({
    // Add sync reducers here
    router,
    locale,
    ...asyncReducers,
  });

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
