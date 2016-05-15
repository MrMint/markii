import * as types from '../constants';

const initialState = {
  roomId: 0,
  currentSongId: '0f17d275-3dd7-4311-bba1-75918fc8f001',
  currentDj: 'Mr.Mint',
  users: [
    { username: 'Mr.Mint' },
    { username: 'Crunch' },
    { username: 'Dwarf' },
  ],
};

export default function room(state = initialState, action) {
  switch (action.type) {
    case types.ROOM_SET_ROOM:
      return { ...action.payload.room };
    default:
      return state;
  }
}
