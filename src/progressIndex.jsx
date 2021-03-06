/* eslint-disable global-require,no-underscore-dangle */
if ((typeof window !== 'undefined' && !window._babelPolyfill) ||
   (typeof global !== 'undefined' && !global._babelPolyfill)) {
  // Don't load babel-polyfill if already loaded: https://github.com/babel/babel/issues/4019
  require('babel-polyfill'); // general ES2015 polyfill (e.g. promise)
}
/* eslint-enable global-require no-underscore-dangle */

/* eslint-disable import/first */

// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
// import { ConnectedRouter } from 'connected-react-router';
// import { PrivateRoute } from '@edx/frontend-auth';

import ProgressPage from './containers/ProgressPage';

// import history from './data/history';
import store from './data/store/configureStore';
// import apiClient from './data/apiClient';

import './App.scss';

/* eslint-enable import/first */

/* This page is deliberately *not* making use of src/utils/i18n/loadI18nDomData.jsx
 *
 * For legal purposes, we want to translate the entire page as a whole using some
 * yet-to-be-determined mechanism.
*/
const locale = 'en';
const messages = {};
addLocaleData(enLocaleData);

const ProgressApp = () => (
  <IntlProvider locale={locale} messages={messages}>
    <Provider store={store}>
      <main className="container mb-4 BFE-wrapper">
        <ProgressPage />
      </main>
    </Provider>
  </IntlProvider>
);

// if (apiClient.ensurePublicOrAuthencationAndCookies(window.location.pathname)) {
ReactDOM.render(<ProgressApp />, document.getElementById('root'));
// }
