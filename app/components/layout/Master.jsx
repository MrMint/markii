import React, { Component } from 'react';
import { AppBar, LeftNav, MenuItem } from 'material-ui';
import 'normalize.css';

export default class Master extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    onLoginTouchTap: React.PropTypes.func.isRequired,
    onLogoutTouchTap: React.PropTypes.func.isRequired,
    onLobbyTouchTap: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  closeNavWrapper = (handleTouchTap) => () => {
    this.handleClose();
    handleTouchTap();
  };

  render() {
    const { onLoginTouchTap,
      onLogoutTouchTap,
      onLobbyTouchTap } = this.props;
    return (
      <div style={{ paddingBottom: '80px' }}>
        <AppBar
          title="Mark II"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <LeftNav ref="leftNav"
          docked={false}
          open={this.state.open}
          onRequestChange={this.handleClose}
        >
          <MenuItem onTouchTap={this.closeNavWrapper(onLoginTouchTap)}>Login</MenuItem>
          <MenuItem onTouchTap={this.closeNavWrapper(onLobbyTouchTap)}>Lobby</MenuItem>
          <MenuItem onTouchTap={this.closeNavWrapper(onLogoutTouchTap)}>Logout</MenuItem>
        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}
