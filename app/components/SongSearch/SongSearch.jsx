import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';

export default class SongSearch extends Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
  };

  onSearchWrapper = () => {
    const { onSearch } = this.props;
    onSearch(this.refs.searchInput.getValue());
  };

  render() {
    return (
      <div>
        <TextField ref="searchInput"/>
        <FlatButton onTouchTap={this.onSearchWrapper} label="Search"/>
      </div>
    );
  }
}
