import * as types from '../constants';
import roomApi from '../../../utilities/api';

function requestRooms() {
  return {
    type: types.ROOMS_REQUEST,
  };
}

export function fetchRooms(page, quantityPerPage) {
  return dispatch => {
    dispatch(requestRooms());
  }
}
