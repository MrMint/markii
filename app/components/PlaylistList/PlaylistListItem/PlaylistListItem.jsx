import React, { Component } from 'react';
import { } from 'material-ui';
import styles from './PlaylistListItem.css';

export default class PlaylistListItem extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    songCount: React.PropTypes.string.isRequired,
  };

  render() {
    const { name, songCount } = this.props;
    return (
      <div className={styles.row}>
        <div>{name}</div>
        <div>{songCount}</div>
      </div>
    );
  }
}
