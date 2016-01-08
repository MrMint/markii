import * as types from '../constants';

export default function search(state = [], action) {
  switch (action.type) {
    case types.SEARCH_YOUTUBE_REQUEST_SUCCESS:
      return [...state, ...action.payload.results];
    default:
      return state;
  }
}
