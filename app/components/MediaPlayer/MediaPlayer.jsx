import React, { Component, PropTypes } from 'react';
import * as mediaSources from './constants';
import YoutubePlayer from './YouTubePlayer';
import { Subject } from 'rxjs/Subject';
import { throttleTime } from 'rxjs/operator/throttleTime';

export default class MediaPlayer extends Component {
  static propTypes = {
    mediaSource: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
    onDuration: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onTimeUpdatedSubject = new Subject();
    this.onTimeUpdatedSubscription = this.onTimeUpdatedSubject
                                      ::throttleTime(1000)
                                      .subscribe(props.onTimeUpdate);
  }

  componentWillUnmount = () => {
    this.onTimeUpdatedSubscription.unsubscribe();
  }

  renderMedia = (mediaSource, url) => {
    switch (mediaSource) {
      case mediaSources.YOUTUBE:
        return (
          <YoutubePlayer
            videoId={url}
            isPlaying={this.props.isPlaying}
            onPlaying={() => {}}
            onProgress={() => {}}
            onDuration={duration => this.props.onDuration(duration)}
            onTimeUpdate={time => this.onTimeUpdatedSubject.next(time)}
            onVolumeChange={() => {}}
            onReady={() => {}}
          />
        );
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
