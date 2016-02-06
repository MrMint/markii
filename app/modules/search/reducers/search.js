import * as types from '../constants';

export default function searchSongs(state = [], action) {
  switch (action.type) {
    case types.SEARCH_SONG_CLEAR_RESULTS:
      return [];
    case types.SEARCH_MEDIA_REQUEST_SUCCESS:
      return [...state, ...action.payload.results];
    default:
      return state;
  }
}
