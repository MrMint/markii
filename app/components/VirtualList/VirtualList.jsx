import React, { Component } from 'react';
import { } from 'material-ui';
import { AutoSizer, VirtualScroll } from 'react-virtualized';

export default class VirtualList extends Component {
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
      <AutoSizer>
        {({ height, width }) => (
          children && children.length > 0 &&
          <VirtualScroll
            width={width}
            height={height}
            rowsCount={children.length}
            rowHeight={rowHeight}
            rowRenderer={this.renderSongRow}
          />
        )}
      </AutoSizer>
    );
  }
}
