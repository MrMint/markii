import {
  PLAYING_START,
  PLAYING_END,
  PLAYING_SET_TIME,
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
