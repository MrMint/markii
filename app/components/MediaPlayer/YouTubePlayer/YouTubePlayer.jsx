import React, { PureComponent, PropTypes } from 'react';
import { loadApi } from '../../../utilities/api/youtubeApi';
import styles from './YouTube.css';

let isApiLoaded = false;

export default class YoutubePlayer extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isSeeking: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    onPlaying: PropTypes.func,
    onProgress: PropTypes.func,
    onDuration: PropTypes.func,
    onEnd: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onVolumeChange: PropTypes.func,
    onReady: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._isMounted = false;
  }

  get isMounted(){
    return this._isMounted;
  }

  set isMounted(newIsMounted) {
    this._isMounted = newIsMounted;
  }

  componentDidMount = () => {
    this.isMounted = true;
    if (!isApiLoaded) {
      loadApi();

      window.onYouTubeIframeAPIReady = () => {
        this.createPlayer();
        isApiLoaded = true;
      };
    } else {
      this.createPlayer();
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO Decide if we want to preview while seeking
    // if (nextProps.isSeeking && (this.props.time !== nextProps.time)) {
    //   this.player.seekTo(nextProps.time, true);
    // }
    if (this.props.isSeeking && !nextProps.isSeeking) {
      this.player.seekTo(nextProps.time, true);
    }

    if (nextProps.volume !== this.props.volume) {
      this.player.setVolume(nextProps.volume);
    }

    if (nextProps.videoId !== this.props.videoId) {
      this.player.cueVideoById(nextProps.videoId);
      if (nextProps.isPlaying) this.player.playVideo();
    }

    if (nextProps.isPlaying !== this.props.isPlaying) {
      if (nextProps.isPlaying) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
    if (this.progressId) {
      cancelAnimationFrame(this.progressId);
    }

    if (this.timeUpdateId) {
      cancelAnimationFrame(this.timeUpdateId);
    }

    if (this.player) {
      this.player.destroy();
    }
  }

  createPlayer() {
    const { videoId } = this.props;

    this.player = new YT.Player(this.node, {
      videoId,
      events: this.events(),
      playerVars: {
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
      },
    });
  }

  events() {
    const { onDuration, onReady, onPlaying, onEnd } = this.props;
    return {
      onReady: () => {
        onDuration(this.player.getDuration());
        onReady();
      },
      onStateChange: ({ data }) => {
        const isEnded = (data === 0);
        const isPlayerPlaying = (data === 1);
        const isPlayerPaused = (data === 2);

        if (isEnded) {
          onEnd();
        }

        if (isPlayerPlaying) {
          onDuration(this.player.getDuration());
          this.timeUpdateId = requestAnimationFrame(this.handleTimeUpdate);
        } else {
          cancelAnimationFrame(this.timeUpdateId);
          this.timeUpdateId = null;

          cancelAnimationFrame(this.progressId);
          this.progressId = null;
        }

        // start fetching progress when playing or buffering
        if (isPlayerPlaying || data === 3) {
          this.progressId = requestAnimationFrame(this.handleProgress);
        }

        // reset duration if a new video was loaded
        if (data === 5) {
          onDuration(0.1);
        }

        if (this.props.isPlaying !== isPlayerPlaying && (isPlayerPlaying || isPlayerPaused)) {
          onPlaying(isPlayerPlaying);
        }
      },
    };
  }

  handleProgress = () => {
    if (!this.isMounted) return;
    const progress = this.player.getVideoLoadedFraction() || 0;

    this.props.onProgress(progress);

    if (this.progressId && progress < 1) {
      this.progressId = requestAnimationFrame(this.handleProgress);
    }
  }

  handleTimeUpdate = () => {
    if (!this.isMounted) return;
    if (this.props.isSeeking) return;
    this.props.onTimeUpdate(this.player.getCurrentTime() || 0, Date.now());

    if (this.timeUpdateId) {
      this.timeUpdateId = requestAnimationFrame(this.handleTimeUpdate);
    }
  }

  render() {
    return (
      <div className={styles.container} ref={c => (this.node = c)}></div>
    );
  }
}
