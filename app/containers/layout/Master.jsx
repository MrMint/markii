import React, { Component } from 'react';
import Master from '../../components/layout/Master';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { logout } from '../../modules/user/actions';

export default class MasterContainer extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    children: React.PropTypes.array.isRequired,
  };

  handleLoginTouchTap = () => {
    this.props.dispatch(routeActions.push('/login'));
  };

  handleLogoutTouchTap = () => {
    this.props.dispatch(logout());
  };

  handleRoomTouchTap = () => {
    this.props.dispatch(routeActions.push('/room'));
  };

  render() {
    const { children } = this.props;
    return (
      <Master
        onLoginTouchTap={this.handleLoginTouchTap}
        onLogoutTouchTap={this.handleLogoutTouchTap}
        onRoomTouchTap={this.handleRoomTouchTap}
      >
        {children}
      </Master>
    );
  }
}

export default connect((state) => ({
}))(MasterContainer);
