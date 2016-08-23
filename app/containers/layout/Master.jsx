import React, { Component } from 'react';
import { pure } from 'recompose';
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
    params: React.PropTypes.object.isRequired,
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

  handleRoomNavItemTouchTap = (slug) => {
    browserHistory.push(`/r/${slug}`);
  }

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
    const { children, playing, rooms, params: { roomSlug } } = this.props;

    return (
      <Master
        onLoginTouchTap={this.handleLoginTouchTap}
        onLogoutTouchTap={this.handleLogoutTouchTap}
        onLobbyTouchTap={this.handleLobbyTouchTap}
        favoriteRooms={rooms}
        playing={playing}
        currentRoomSlug={roomSlug}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onVolumeChange={this.handleVolumeChange}
        onSeekStart={this.handleSeekStart}
        onSeekStop={this.handleSeekStop}
        onSeekChange={this.handleSeekChange}
        onRoomNavItemTouchTap={this.handleRoomNavItemTouchTap}
        onLobbyTouchTap={this.handleLobbyTouchTap}
      >
        {children}
      </Master>
    );
  }
}

export default connect((state) => ({
  playing: state.playing,
  rooms: state.rooms,
}))(pure(MasterContainer));
