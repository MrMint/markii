import React, { Component } from 'react';
import { } from 'material-ui';
import styles from './SongSearchListItem.css';

export default class SongSearchListItem extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
  };

  render() {
    const { title, source, thumbnail } = this.props;
    return (
      <div>
        <div><img src={thumbnail}/></div>
        <div>{title}</div>
        <div>{source}</div>
      </div>
    );
  }
}
