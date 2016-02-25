import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import configureStore from '../store/configureStore';
import DevTools from './DevTools';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Configure the store
const store = configureStore(browserHistory);

class App extends Component {

  static propTypes = {
    routes: React.PropTypes.object.isRequired,
  };

  renderDevTools = () => <DevTools />

  renderRouter = () =>
    <Router history={browserHistory}>
      {this.props.routes}
    </Router>

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

export default dragDropContext(HTML5Backend)(App);
