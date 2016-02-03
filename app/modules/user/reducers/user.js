import * as types from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case types.USER_SIGN_IN_SUCCESS:
      return {
        token: action.payload.token,
      };
    case types.USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
}
