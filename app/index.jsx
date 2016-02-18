import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import Lobby from './routes/lobby/containers/lobby';

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/layout/master').default,
    indexRoute: {
      component: Lobby,
    },
    childRoutes: [
      require('./routes/lobby').default,
      require('./routes/login').default,
      require('./routes/room').default,
    ],
  }],
};

render(<App routes={rootRoute} />, document.getElementById('root'));
