import { userIsAuthenticated } from '../../utilities/auth';

export default {
  path: 'lobby',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/create').default,
      ]);
    });
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, userIsAuthenticated(require('./containers/lobby').default));
    });
  },
};
