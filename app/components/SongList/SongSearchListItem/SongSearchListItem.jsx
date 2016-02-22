import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';
import * as sources from '../../MediaPlayer/constants';
import styles from './SongSearchListItem.css';
import { FaYoutube } from 'react-icons/lib/fa';

export default class SongSearchListItem extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    playlists: React.PropTypes.array.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
  };

  handleChange = (event, index, value) => {
    const {
      title,
      source,
      thumbnail,
      onAddSongToPlaylist,
    } = this.props;
    onAddSongToPlaylist({ name: title, source, thumbnail }, value);
  }

  renderSourceIcon = (source) => {
    switch (source) {
      case sources.YOUTUBE:
        return <FaYoutube className={styles.source} />;
      default:
        return <div>Unkown Source</div>;
    }
  }

  render() {
    const { title, source, thumbnail, playlists } = this.props;
    return (
      <div className={styles.row}>
        <div className={styles.left}>
          <img className={styles.thumbnail} src={thumbnail} />
        </div>
        <div className={styles.center}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.right}>
          { this.renderSourceIcon(source) }
        </div>
        { // TODO these selectfields are killing performance, investigate
          playlists &&
          <div className={styles.right}>
            <SelectField onChange={this.handleChange} fullWidth>
              { playlists.map(playlist =>
                <MenuItem
                  value={playlist.id}
                  key={playlist.id}
                  primaryText={playlist.name}
                />)
              }
            </ SelectField>
          </div>
        }
      </div>
    );
  }
}
