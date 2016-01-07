import React, { Component } from 'react';
import { } from 'material-ui';
import PlaylistSearch from './PlaylistSearch';
import PlaylistSearchResults from './PlaylistSearchResults';
import style from './PlaylistBuilder.css';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    searchResults: React.PropTypes.array.isRequired,
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div>
        <PlaylistSearch />
        <PlaylistSearchResults songs={searchResults}/>
      </div>
    );
  }
}
