import {
  PLAYING_START,
  PLAYING_END,
  PLAYING_SET_SONG,
  PLAYING_SET_TIME,
  PLAYING_SET_DURATION,
  PLAYING_SET_VOLUME,
  PLAYING_START_SEEK,
  PLAYING_STOP_SEEK,
} from '../constants';

export function setSong(songId) {
  return {
    type: PLAYING_SET_SONG,
    payload: {
      songId,
    },
  };
}

export function startPlaying() {
  return {
    type: PLAYING_START,
  };
}

export function stopPlaying() {
  return {
    type: PLAYING_END,
  };
}

export function setPlayTime(seconds, timestamp) {
  return {
    type: PLAYING_SET_TIME,
    payload: {
      time: seconds,
      timestamp,
    },
  };
}

export function setDuration(seconds) {
  return {
    type: PLAYING_SET_DURATION,
    payload: {
      duration: seconds,
    },
  };
}

export function setVolume(volume) {
  return {
    type: PLAYING_SET_VOLUME,
    payload: {
      volume,
    },
  };
}

export function startSeeking() {
  return {
    type: PLAYING_START_SEEK,
  };
}

export function stopSeeking() {
  return {
    type: PLAYING_STOP_SEEK,
  };
}
