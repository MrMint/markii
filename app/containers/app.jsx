import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHistory } from 'history';
import configureStore from '../store/configureStore';
import DevTools from './DevTools';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Configure the store
const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store);
export default class App extends Component {

  static propTypes = {
    routes: React.PropTypes.object.isRequired,
  };

  renderDevTools = () => {
    return (
      <DevTools />
    );
  }

  renderRouter = () => {
    return (
      <Router history={history}>
        {this.props.routes}
      </Router>
    );
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.renderRouter()}
          {this.renderDevTools()}
        </div>
      </Provider>
    );
  }
}