import * as types from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.USER_SIGN_IN_SUCCESS:
      return { ...state, token: action.payload.token };
    case types.USER_SIGN_OUT:
      return {};
    case types.USER_GET_DETAILS_SUCCESS:
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
