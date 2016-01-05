export default {
  path: 'create',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/createRoomForm').default);
    });
  },
};
