import React, { Component } from 'react';
import MediaControl from '../MediaControl';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import 'normalize.css';
import styles from './Master.css';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default class Master extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    onLoginTouchTap: React.PropTypes.func.isRequired,
    onLogoutTouchTap: React.PropTypes.func.isRequired,
    onLobbyTouchTap: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    playing: React.PropTypes.object.isRequired,
    onPlay: React.PropTypes.func.isRequired,
    onPause: React.PropTypes.func.isRequired,
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
    const {
      onLoginTouchTap,
      onLogoutTouchTap,
      onLobbyTouchTap,
      playing,
      onPlay,
      onPause,
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={styles.container}>
          <AppBar
            className={styles.appBar}
            title="Mark II"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer
            ref="leftNav"
            docked={false}
            open={this.state.open}
            onRequestChange={this.handleClose}
          >
            <MenuItem onTouchTap={this.closeNavWrapper(onLoginTouchTap)}>Login</MenuItem>
            <MenuItem onTouchTap={this.closeNavWrapper(onLobbyTouchTap)}>Lobby</MenuItem>
            <MenuItem onTouchTap={this.closeNavWrapper(onLogoutTouchTap)}>Logout</MenuItem>
          </Drawer>
          {this.props.children}
          <MediaControl
            isPlaying={playing.isPlaying}
            playTime={playing.time}
            duration={playing.duration}
            onPlay={onPlay}
            onPause={onPause}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
