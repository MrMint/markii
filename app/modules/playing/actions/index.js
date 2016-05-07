import {
  PLAYING_START,
  PLAYING_END,
  PLAYING_SET_SONG,
  PLAYING_SET_TIME,
  PLAYING_SET_DURATION,
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

export function setPlayTime(seconds) {
  return {
    type: PLAYING_SET_TIME,
    payload: {
      time: seconds,
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
