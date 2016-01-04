import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class MediaPlayer extends Component {
  static propTypes = {
    url: React.PropTypes.string.Required,
  }

  onReady = (event) => {
    // access to player in all event handlers via event.target
    alert("ready");
    event.target.pauseVideo();
  }

  render() {

    const opts = {
      height: '390',
      width: '640',
      // playerVars: { // https://developers.google.com/youtube/player_parameters
      //   autoplay: 1,
      // },
    };

    return (
      <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={this.onReady}
      />
    );
  }
}
