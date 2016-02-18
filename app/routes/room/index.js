import { userIsAuthenticated } from '../../utilities/auth';

export default {
  path: ':roomSlug',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, userIsAuthenticated(require('./containers/room').default));
    });
  },
};
