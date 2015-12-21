export default {
  path: '/lobby',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/lobby').default);
    });
  },
};
