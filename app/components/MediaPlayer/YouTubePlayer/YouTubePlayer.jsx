import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YoutubePlayer extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
  };

  onReady = (event) => {
    // todo investigate why this doesn't work when not wrapped in a timeout
    setTimeout(() => {
      // event.target.playVideo();
      // event.target.seekTo(20);
    }, 10);
  };

  render() {
    const { url } = this.props;
    const opts = {
      width:'100%',
      height: '360px',
      // width: '640',
      // playerVars: { // https://developers.google.com/youtube/player_parameters
      //   loop: 1,
      // },
    };

    return (
      <YouTube
        videoId={url}
        opts={opts}
        onReady={this.onReady}
      />
    );
  }
}
