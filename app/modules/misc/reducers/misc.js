import * as types from '../constants';

const initialState = {
  selectedPlaylist: null,
};

export default function room(state = initialState, action) {
  switch (action.type) {
    case types.MISC_SELECTEDPLAYLIST_SET:
      return { ...state, selectedPlaylist: action.payload.playlistId };
    case types.MISC_SELECTEDPLAYLIST_CLEAR:
      return { ...state, selectedPlaylist: null };
    case types.MISC_SONGNAVSELECTION_SET:
      return {...state, songNavSelection: action.payload.songNavSelection}
    default:
      return state;
  }
}
