import React, { Component } from 'react';
import { } from 'material-ui';
import { VirtualScroll } from 'react-virtualized';

export default class PlaylistSearchResults extends Component {
  static propTypes = {
    songs: React.PropTypes.array.isRequired,
  }

  renderSongRow = (index) => {
    const { songs } = this.props;
    return (<div>{songs[index].name}</div>);
  }

  render() {
    const { songs } = this.props;
    return (
      <div>
        <VirtualScroll
          width={300}
          height={300}
          rowsCount={songs.length}
          rowHeight={20}
          rowRenderer={this.renderSongRow}
        />
      </div>
    );
  }
}
