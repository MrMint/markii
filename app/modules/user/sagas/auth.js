import { call, take, put, race } from 'redux-saga';
import { USER_SIGN_IN, USER_SIGN_OUT } from '../constants';
import { authorizeSuccess, authorizeFailure, logout } from '../actions';
import * as auth from '../../../utilities/auth';
import { delay } from '../../../utilities';
import { routeActions } from 'react-router-redux';

function* authorize(credentialsOrToken, refresh) {
  try {
    if (!refresh) {
      const token = yield call(auth.authorizeWithCredentials,
        credentialsOrToken.username,
        credentialsOrToken.password);

      yield call(auth.storeToken, token);
      yield put(authorizeSuccess(token));
      return token;
    }
    return null;
  } catch (error) {
    yield call(auth.storeToken, null);
    yield put(authorizeFailure(error));
    return null;
  }
}

function* refreshLoop(token) {
  while (true) {
    var newToken = yield authorize(token, true);
    if (newToken === null) {
      return;
    }
    yield call(delay, token.expires_in);
  }
}

export function* authentication() {
  // Check if we already have a token, if we do lets refresh right away
  let storedToken = yield call(auth.getStoredToken);
  while (true) {
    // If no token to start, wait for the user to login
    if (!storedToken) {
      const { payload: { username, password } } = yield take(USER_SIGN_IN);
      storedToken = yield authorize({ username, password }, false);
      // Auth failed, wait for user to try and login again
      if (!storedToken) {
        continue;
      }
    }

    // Wait for the user to logout, or fail a refresh
    const { signOutAction } = yield race({
      signOutAction: take(USER_SIGN_OUT),
      tokenRefreshFailed: call(refreshLoop, storedToken),
    });

    // if the user logged out, clear token
    yield call(auth.storeToken, null);
    storedToken = null;
    if (!signOutAction) {
      yield put(logout());
    }
    yield put(routeActions.push('/login'));
  }
}
