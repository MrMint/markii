import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import Lobby from './routes/lobby/containers/lobby';
import 'react-virtualized/styles.css';
import { userIsAuthenticated } from './utilities/auth';
import { AppContainer } from 'react-hot-loader';

const rootElement = document.getElementById('root');

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/layout/master').default,
    indexRoute: {
      component: userIsAuthenticated(Lobby),
    },
    childRoutes: [
      require('./routes/lobby').default,
      require('./routes/login').default,
      require('./routes/room').default,
    ],
  }],
};

// Accept HMR
if (module.hot) {
  module.hot.accept();
}

render(
  <AppContainer><App routes={rootRoute} /></AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    const App = require('./containers/app').default; // eslint-disable-line
    render(
      <AppContainer><App routes={rootRoute} /></AppContainer>,
      rootElement
    );
  });
}
