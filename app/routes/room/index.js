import { userIsAuthenticated } from '../../utilities/auth';

export default {
  path: '/r/:roomSlug',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, userIsAuthenticated(require('./containers/room').default));
    });
  },
};
