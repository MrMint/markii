import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../modules/reducers';

// Setup middleware
const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/reducers', () => {
      const nextRootReducer = require('../modules/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
