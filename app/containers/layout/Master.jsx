import React, { Component } from 'react';
import Master from '../../components/layout/Master';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logout } from '../../modules/user/actions';

export default class MasterContainer extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    children: React.PropTypes.object.isRequired,
  };

  handleLoginTouchTap = () => {
    browserHistory.push('/login');
  };

  handleLogoutTouchTap = () => {
    this.props.dispatch(logout());
  };

  handleLobbyTouchTap = () => {
    browserHistory.push('/lobby');
  };

  render() {
    const { children } = this.props;
    return (
      <Master
        onLoginTouchTap={this.handleLoginTouchTap}
        onLogoutTouchTap={this.handleLogoutTouchTap}
        onLobbyTouchTap={this.handleLobbyTouchTap}
      >
        {children}
      </Master>
    );
  }
}

export default connect(() => ({}))(MasterContainer);
