import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
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
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  static propTypes = {
    routes: React.PropTypes.object.isRequired,
  };

  renderDevTools = () => <DevTools />

  renderRouter = () =>
    <Router history={history}>
      {this.props.routes}
    </Router>

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.renderRouter()}
        </div>
      </Provider>
    );
  }
}

          // {this.renderDevTools()}
export default dragDropContext(HTML5Backend)(App);
