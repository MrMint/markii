import React, { Component } from 'react';
import { } from 'material-ui';
import { VirtualScroll } from 'react-virtualized';

export default class SongList extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    rowHeight: React.PropTypes.number.isRequired,
  };

  renderSongRow = (index) => {
    const { children } = this.props;
    return (children[index]);
  };

  render() {
    const { children, rowHeight } = this.props;
    return (
      <div>
        {
        children && children.length > 0 &&
        <VirtualScroll
          width={300}
          height={300}
          rowsCount={children.length}
          rowHeight={rowHeight}
          rowRenderer={this.renderSongRow}
        />
        }
      </div>
    );
  }
}
