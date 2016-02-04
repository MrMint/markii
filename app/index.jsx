import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';

const rootRoute = {
  component: require('./containers/layout/master').default,
  childRoutes: [{
    path: '/',
    component: 'div',
    childRoutes: [
      require('./routes/login').default,
      require('./routes/lobby').default,
      require('./routes/room').default,
    ],
  }],
};

render(<App routes={rootRoute} />, document.getElementById('root'));
