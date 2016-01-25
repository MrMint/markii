import * as types from '../constants';

export function login(username, password) {
  return {
    type: types.USER_SIGN_IN,
    payload: {
      username,
      password,
    },
  };
}

export function logout() {
  return {
    type: types.USER_SIGN_OUT,
  };
}

export function authorizeSuccess(token) {
  return {
    type: types.USER_SIGN_IN_SUCCESS,
    payload: {
      token,
    },
  };
}

export function authorizeFailure(error) {
  return {
    type: types.USER_SIGN_IN_FAILURE,
    payload: {
      error,
    },
  };
}
