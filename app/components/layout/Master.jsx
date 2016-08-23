import React, { Component } from 'react';
import { pure } from 'recompose';
import MediaControl from '../MediaControl';
import Nav from '../Nav';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'normalize.css';
import styles from './Master.css';

const darkMuiTheme = getMuiTheme({
  ...darkBaseTheme,
  palette: {
    ...darkBaseTheme.palette,
    primary1Color: '#673ab7',
    accent1Color: '#cddc39',
    accent2Color: '#cddc39',
    accent3Color: '#cddc39',
    alternateTextColor: '#fff',
  },
});

class Master extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    currentRoomSlug: React.PropTypes.string.isRequired,
    favoriteRooms: React.PropTypes.array.isRequired,
    recentRooms: React.PropTypes.array.isRequired,
    onLobbyTouchTap: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    playing: React.PropTypes.object.isRequired,
    onPlay: React.PropTypes.func.isRequired,
    onPause: React.PropTypes.func.isRequired,
    onVolumeChange: React.PropTypes.func.isRequired,
    onSeekStart: React.PropTypes.func.isRequired,
    onSeekStop: React.PropTypes.func.isRequired,
    onSeekChange: React.PropTypes.func.isRequired,
    onRoomNavItemTouchTap: React.PropTypes.func.isRequired,
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  closeNavWrapper = (handleTouchTap) => () => {
    this.handleClose();
    handleTouchTap();
  };

  render() {
    const {
      onLobbyTouchTap,
      playing,
      onPlay,
      onPause,
      onVolumeChange,
      onSeekStart,
      onSeekStop,
      onSeekChange,
      onRoomNavItemTouchTap,
      favoriteRooms,
      currentRoomSlug,
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={styles.container}>
          <div className={styles.mainContentContainer}>
            <Nav
              rooms={favoriteRooms}
              currentRoomSlug={currentRoomSlug}
              onLobbyTouchTap={onLobbyTouchTap}
              onRoomNavItemTouchTap={onRoomNavItemTouchTap}
            />
            {this.props.children}
          </div>
          <MediaControl
            isPlaying={playing.isPlaying}
            isSeeking={playing.isSeeking}
            playTime={playing.seek.time}
            duration={playing.duration}
            volume={playing.volume}
            onPlay={onPlay}
            onPause={onPause}
            onVolumeChange={onVolumeChange}
            onSeekStart={onSeekStart}
            onSeekStop={onSeekStop}
            onSeekChange={onSeekChange}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default pure(Master);
