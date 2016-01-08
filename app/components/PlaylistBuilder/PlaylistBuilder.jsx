import React, { Component } from 'react';
import { } from 'material-ui';
import SongSearch from '../SongSearch';
import PlaylistSearchResults from './PlaylistSearchResults';
import style from './PlaylistBuilder.css';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    searchResults: React.PropTypes.array.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  }

  render() {
    const { searchResults, onSearch } = this.props;
    return (
      <div>
        <SongSearch onSearch={onSearch}/>
        <PlaylistSearchResults songs={searchResults}/>
      </div>
    );
  }
}
