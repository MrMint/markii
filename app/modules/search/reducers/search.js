import * as types from '../constants';

const initialState = {
  songs: [],
  isSearching: false,
};

export default function searchSongs(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_MEDIA_REQUEST:
      return {...state, isSearching: true};
    case types.SEARCH_MEDIA_CLEAR_RESULTS:
      return {...state, songs: []};
    case types.SEARCH_MEDIA_REQUEST_SUCCESS:
      return {...state, songs: [...action.payload.results], isSearching: false};
    default:
      return state;
  }
}
