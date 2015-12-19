import * as types from '../constants';

export default function encounters(state = [], action) {
  switch (action.type) {
    case types.ROOMS_REQUEST_SUCCESS:
      return action.rooms;
    default:
      return state;
  }
}
