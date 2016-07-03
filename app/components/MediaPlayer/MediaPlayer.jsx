import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as mediaSources from './constants';
import YoutubePlayer from './YouTubePlayer';
import { Subject } from 'rxjs/Subject';
import { throttleTime } from 'rxjs/operator/throttleTime';

export default class MediaPlayer extends Component {
  static propTypes = {
    mediaSource: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    isSeeking: PropTypes.bool.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
    onDuration: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    onPlayingChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onTimeUpdatedSubject = new Subject();
    this.onTimeUpdatedSubscription =
      this.onTimeUpdatedSubject
        ::throttleTime(500)
        .subscribe(next => props.onTimeUpdate(next.time, next.timestamp));
  }

  shouldComponentUpdate = (nextProps) => shallowCompare(this, nextProps);

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
            isSeeking={this.props.isSeeking}
            time={this.props.time}
            volume={this.props.volume}
            onPlaying={playing => this.props.onPlayingChange(playing)}
            onProgress={() => {}}
            onEnd={this.props.onEnd}
            onDuration={duration => this.props.onDuration(duration)}
            onTimeUpdate={(time, timestamp) => this.onTimeUpdatedSubject.next({ time, timestamp })}
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
