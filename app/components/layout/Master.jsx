import React, { Component } from 'react';

export default class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}
