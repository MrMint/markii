import React, { PureComponent } from 'react';
import { TextField, FlatButton } from 'material-ui';

export default class SongSearch extends PureComponent {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  onSearchWrapper = () => {
    const { onSearch } = this.props;
    const { query } = this.state;
    this.setState({ query: '' });
    this.refs.searchInput.blur();
    onSearch(query);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      this.onSearchWrapper();
    }
  }

  handleSearchInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  render() {
    const { className } = this.props;
    const { query } = this.state;
    return (
      <div className={className} onkeyDown={this.handleKeyDown}>
        <TextField
          ref="searchInput"
          hintText="Search..."
          onKeyDown={this.handleKeyDown}
          value={query}
          onChange={this.handleSearchInputChange}
        />
        <FlatButton onTouchTap={this.onSearchWrapper} label="Search" />
      </div>
    );
  }
}
