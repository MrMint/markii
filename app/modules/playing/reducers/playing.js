import * as types from '../constants';

const initialState = {
  songId: '0f17d275-3dd7-4311-bba1-75918fc8f001',
  isPlaying: false,
  isSeeking: false,
  seek: {
    time: 0,
    timestamp: 0,
  },
  volume: 75,
  duration: 0,
};

const updateSeek = (state, time, timestamp) => {
  if (timestamp >= state.seek.time) {
    return { ...state, seek: { time, timestamp } };
  }
  return state;
};

export default function playing(state = initialState, action) {
  switch (action.type) {
    case types.PLAYING_SET_SONG:
      return { ...state, songId: action.payload.songId };
    case types.PLAYING_START:
      return { ...state, isPlaying: true };
    case types.PLAYING_PAUSE:
      return { ...state, isPlaying: false };
    case types.PLAYING_END:
      return { ...state, isPlaying: false };
    case types.PLAYING_SET_TIME:
      return updateSeek(state, action.payload.time, action.payload.timestamp);
    case types.PLAYING_SET_DURATION:
      return { ...state, duration: action.payload.duration };
    case types.PLAYING_SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    case types.PLAYING_START_SEEK:
      return { ...state, isSeeking: true };
    case types.PLAYING_STOP_SEEK:
      return { ...state, isSeeking: false };
    default:
      return state;
  }
}
