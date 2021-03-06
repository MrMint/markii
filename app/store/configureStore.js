import { createStore, applyMiddleware, compose } from 'redux';
// import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk';
import sagaMiddleware from 'redux-saga';
import rootReducer from '../modules/reducers';
import createSagaMiddleware from 'redux-saga';
import saga from '../modules/sagas';

function withDevTools(middleware) {
  const devTools = window.devToolsExtension
    ? window.devToolsExtension()
    : require('../containers/DevTools').default.instrument();
  return compose(middleware, devTools);
}

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
  );

  middleware = withDevTools(middleware);
  const store = middleware(createStore)(rootReducer, initialState);

  sagaMiddleware.run(saga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/reducers', () => {
      const nextRootReducer = require('../modules/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
