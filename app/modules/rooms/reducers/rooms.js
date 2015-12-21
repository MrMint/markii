import * as types from '../constants';

const initialState = [
  {
    name: 'Best name 1',
    currentlyPlaying: 'Best song 1',
  },
  {
    name: 'Best name 2',
    currentlyPlaying: 'Best song 2',
  },
  {
    name: 'Best name 3',
    currentlyPlaying: 'Best song 3',
  },
  {
    name: 'Best name 4',
    currentlyPlaying: 'Best song 4',
  },
];

export default function encounters(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
