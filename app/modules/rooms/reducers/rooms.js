import * as types from '../constants';

const initialState = [
  {
    id: '0',
    slug: 'voxel',
    name: 'voxels',
    currentlyPlaying: 'Best song 1',
    chatId: '0',
  },
  {
    id: '1',
    slug: 'BestName2',
    name: 'Best name 2',
    currentlyPlaying: 'Best song 2',
    chatId: '1',
  },
  {
    id: '2',
    slug: 'BestName3',
    name: 'Best name 3',
    currentlyPlaying: 'Best song 3',
  },
  {
    id: '3',
    slug: 'BestName4',
    name: 'Best name 4',
    currentlyPlaying: 'Best song 4',
  },
];

export default function rooms(state = initialState, action) {
  switch (action.type) {
    case types.ROOMS_REQUEST_SUCCESS:
      return action.rooms;
    default:
      return state;
  }
}
