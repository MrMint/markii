import React, { Component } from 'react';
import { AppBar, LeftNav } from 'material-ui';
import 'normalize.css';

export default class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
  }

  handleToggleNavClick = () => {
    if (this.refs.leftNav) {
      this.refs.leftNav.toggle();
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="Mark II"
          onLeftIconButtonTouchTap={this.handleToggleNavClick}
        />
        <LeftNav ref="leftNav" docked={false}/>
        {this.props.children}
      </div>
    );
  }
}
