import * as types from '../constants';

export function addSong(song) {
  return {
    type: types.SONG_ADD,
    payload: {
      song,
    },
  };
}
