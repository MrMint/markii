import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';

export default class SongSearch extends Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
  }

  render() {
    const { onSearch } = this.props;
    return (
      <div>
        <TextField />
        <FlatButton onTouchTap={onSearch} label="Search"/>
      </div>
    );
  }
}
