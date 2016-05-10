
import * as types from '../constants';

const initialState = {
  songId: '0f17d275-3dd7-4311-bba1-75918fc8f001',
  isPlaying: false,
  time: 0,
};

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.PLAYING_SET_SONG:
      return { ...state, songId: action.payload.songId };
    case types.PLAYING_START:
      return { ...state, isPlaying: true };
    case types.PLAYING_END:
      return { ...state, isPlaying: false };
    case types.PLAYING_SET_TIME:
      return { ...state, time: action.payload.time };
    case types.PLAYING_SET_DURATION:
      return { ...state, duration: action.payload.duration };
    default:
      return state;
  }
}
