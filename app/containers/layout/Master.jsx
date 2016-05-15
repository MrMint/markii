import React, { Component } from 'react';
import Master from '../../components/layout/Master';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logout } from '../../modules/user/actions';
import {
  stopPlaying,
  startPlaying,
  setVolume,
  startSeeking,
  stopSeeking,
  setPlayTime,
} from '../../modules/playing/actions';

class MasterContainer extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    children: React.PropTypes.object.isRequired,
    playing: React.PropTypes.object.isRequired,
    rooms: React.PropTypes.array.isRequired,
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

  handleVolumeChange = (volume) => {
    const { dispatch } = this.props;
    dispatch(setVolume(volume));
  }

  handleSeekStart = () => {
    const { dispatch } = this.props;
    dispatch(startSeeking());
  }

  handleSeekStop = () => {
    const { dispatch } = this.props;
    dispatch(stopSeeking());
  }

  handleSeekChange = (seconds, timestamp) => {
    const { dispatch } = this.props;
    dispatch(setPlayTime(seconds, timestamp));
  }


  render() {
    const { children, playing, rooms } = this.props;
    return (
      <Master
        onLoginTouchTap={this.handleLoginTouchTap}
        onLogoutTouchTap={this.handleLogoutTouchTap}
        onLobbyTouchTap={this.handleLobbyTouchTap}
        rooms={rooms}
        playing={playing}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onVolumeChange={this.handleVolumeChange}
        onSeekStart={this.handleSeekStart}
        onSeekStop={this.handleSeekStop}
        onSeekChange={this.handleSeekChange}
      >
        {children}
      </Master>
    );
  }
}

export default connect((state) => ({
  playing: state.playing,
  rooms: state.rooms,
}))(MasterContainer);
