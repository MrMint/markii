import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';

export default class SongSearch extends Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
  };

  onSearchWrapper = () => {
    const { onSearch } = this.props;
    onSearch(this.refs.searchInput.getValue());
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <TextField ref="searchInput" hintText="Song name..."/>
        <FlatButton onTouchTap={this.onSearchWrapper} label="Search"/>
      </div>
    );
  }
}
