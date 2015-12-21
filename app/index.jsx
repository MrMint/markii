import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';

const rootRoute = {
  component: require('./components/layout/master').default,
  childRoutes: [{
    path: '/',
    component: 'div',
    childRoutes: [
      require('./routes/login').default,
      require('./routes/lobby').default,
    ],
  }],
};

render(<App routes={rootRoute} />, document.getElementById('root'));
