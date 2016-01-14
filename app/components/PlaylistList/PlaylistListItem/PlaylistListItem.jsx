import React, { Component } from 'react';
import { } from 'material-ui';
import style from './PlaylistListItem.css';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    songCount: React.PropTypes.string.isRequired,
  }

  render() {
    const { name, songCount } = this.props;
    return (
      <div>
        <div>{name}</div>
        <div>{songCount}</div>
      </div>
    );
  }
}
