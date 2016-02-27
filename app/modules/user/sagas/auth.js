import { call, take, put, race } from 'redux-saga/effects';
import { USER_SIGN_IN, USER_SIGN_OUT } from '../constants';
import { browserHistory } from 'react-router';
import { authorizeSuccess, authorizeFailure, logout } from '../actions';
import * as auth from '../../../utilities/auth';
import { delay } from '../../../utilities';

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
  /*eslint-disable */
  while (true) {
  /*eslint-enable */
    yield call(delay, auth.secondsUntilTokenExpires(token) * 1000);
    var newToken = yield authorize(token, true);
    if (newToken === null) {
      return;
    }
  }
}

export function* authentication() {
  // Check if we already have a token, if we do lets refresh right away
  let storedToken = yield call(auth.getStoredToken);
  /*eslint-disable */
  while (true) {
  /*eslint-enable */
    // If no token to start, wait for the user to login
    if (!storedToken) {
      const { payload: { username, password, redirect } } = yield take(USER_SIGN_IN);
      storedToken = yield authorize({ username, password }, false);
      // Auth failed, wait for user to try and login again
      if (!storedToken) {
        continue;
      }
      yield call(browserHistory.push, redirect || '/');
    } else {
      yield put(authorizeSuccess(storedToken));
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
  }
}
