import {
  PLAYING_START,
  PLAYING_END,
  PLAYING_SET_SONG,
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
