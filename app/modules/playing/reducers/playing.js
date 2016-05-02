
import * as types from '../constants';

const initialState = {
  song: 0,
};

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.PLAYING_SET_SONG:
      return { song: action.payload.songId }
    default:
      return state;
  }
}
