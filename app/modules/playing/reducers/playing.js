
import * as types from '../constants';

const initialState = {
  song: '0f17d275-3dd7-4311-bba1-75918fc8f001',
};

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.PLAYING_SET_SONG:
      return { song: action.payload.songId }
    default:
      return state;
  }
}
