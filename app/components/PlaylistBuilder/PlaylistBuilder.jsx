import React, { Component } from 'react';
import { } from 'material-ui';
import SongSearch from '../SongSearch';
import SongList from '../SongList';
import PlaylistList from '../PlaylistList';
import style from './PlaylistBuilder.css';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    searchResults: React.PropTypes.array.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  };

  render() {
    const { searchResults, onSearch, playlists } = this.props;
    return (
      <div className={style.container}>
        <PlaylistList playlists={playlists} />
        <SongSearch onSearch={onSearch}/>
        <SongList rowHeight={20}>
          {
            searchResults && searchResults.length > 0 ?
            searchResults.map(result =>
              <div>{result.name}</div>
            )
            : <div>No Results</div>
          }
        </SongList>
      </div>
    );
  }
}
