import R from 'ramda';
import * as types from '../constants';

const initialState = ['0f17d275-3dd7-4311-bba1-75918fc8f001'];

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.QUEUE_PUSH:
      return [action.payload.songId, ...state];
    case types.QUEUE_POP:
      return R.remove(0, 1, state);
    case types.QUEUE_ENQUEUE:
      return [...state, action.payload.songId];
    default:
      return state;
  }
}
