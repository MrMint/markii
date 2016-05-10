import React, { Component } from 'react';
import Master from '../../components/layout/Master';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logout } from '../../modules/user/actions';
import { stopPlaying, startPlaying } from '../../modules/playing/actions';

class MasterContainer extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    children: React.PropTypes.object.isRequired,
    playing: React.PropTypes.object.isRequired,
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

  handlePlay = () => {
    const { dispatch } = this.props;
    dispatch(startPlaying());
  };

  handlePause = () => {
    const { dispatch } = this.props;
    dispatch(stopPlaying());
  };

  render() {
    const { children, playing } = this.props;
    return (
      <Master
        onLoginTouchTap={this.handleLoginTouchTap}
        onLogoutTouchTap={this.handleLogoutTouchTap}
        onLobbyTouchTap={this.handleLobbyTouchTap}
        playing={playing}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
      >
        {children}
      </Master>
    );
  }
}

export default connect((state) => ({
  playing: state.playing,
}))(MasterContainer);
