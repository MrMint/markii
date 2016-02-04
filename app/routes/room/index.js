import { userIsAuthenticated } from '../../utilities/auth';

export default {
  path: 'room',

  // getChildRoutes(location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       // require('./routes/create').default,
  //     ]);
  //   });
  // },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, userIsAuthenticated(require('./containers/room').default));
    });
  },
};
