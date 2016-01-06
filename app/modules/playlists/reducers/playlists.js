import * as types from '../constants';

const initialState = [
  {
    id: '0f17d275-3dd7-4311-bba1-75918fc8f001',
    name: 'Best of Miku 2015',
    songs: [0, 1],
  },
];

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.PLAYLISTS_REQUEST_SUCCESS:
      return action.payload.playlists;
    default:
      return state;
  }
}
