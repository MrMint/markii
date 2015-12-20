import React, { Component } from 'react';
import 'normalize.css';

export default class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}
