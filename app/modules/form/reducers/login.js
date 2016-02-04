import * as types from '../../user/constants';

export function loginForm(state, action) {
  switch (action.type) {
    case types.USER_SIGN_IN_FAILURE:
      return {
        ...state,
        password: {},
        _error: action.payload.error,
      };
    case types.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        email: {},
        password: {},
        _error: undefined,
      };
    default:
      return state;
  }
}
