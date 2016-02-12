import { userIsAuthenticated } from '../../utilities/auth';

export default {
  path: 'room',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, userIsAuthenticated(require('./containers/room').default));
    });
  },
};
