import React, { Component } from 'react';
import * as mediaSources from './constants';
import YoutubePlayer from './youtubePlayer';

export default class MediaPlayer extends Component {
  static propTypes = {
    mediaSource: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  };

  renderMedia = (mediaSource, url) => {
    switch (mediaSource) {
      case mediaSources.YOUTUBE:
        return (<YoutubePlayer url={url} />);
      default:
        return (<div>Error, unrecognized media source</div>);
    }
  };

  render() {
    const { mediaSource, url } = this.props;
    return (
      <div>
        {this.renderMedia(mediaSource, url)}
      </div>
    );
  }
}
