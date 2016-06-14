import {
  MISC_SELECTEDPLAYLIST_SET,
  MISC_SELECTEDPLAYLIST_CLEAR,
  MISC_SONGNAVSELECTION_SET,
} from '../constants';

export function setActivePlaylist(playlistId) {
  return {
    type: MISC_SELECTEDPLAYLIST_SET,
    payload: { playlistId },
  };
}

export function clearActivePlaylist() {
  return {
    type: MISC_SELECTEDPLAYLIST_CLEAR,
  };
}

export function setSongNavSelectionType(songNavSelection) {
  return {
    type: MISC_SONGNAVSELECTION_SET,
    payload: {
      songNavSelection,
    },
  };
}
