import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHistory } from 'history';
import configureStore from '../store/configureStore';
import DevTools from './DevTools';

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
