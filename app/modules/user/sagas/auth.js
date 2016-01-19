import { call, take, put, race } from 'redux-saga';
import auth from '../../../utilities/auth';
import { authorizeSuccess, authorizeFailure, logout } from '../actions';
import { delay } from '../../../utilities';
import { USER_SIGN_IN, USER_SIGN_OUT } from '../constants';

function* authorize(credentialsOrToken, refresh) {
  try {
    const token = yield call(auth.authorize, credentialsOrToken, refresh);
    yield call(auth.storeToken, token);
    yield put(authorizeSuccess(token));
    return token;
  } catch (e) {
    yield call(auth.storeToken, null);
    yield put(authorizeFailure(e));
    return null;
  }
}

function* refreshLoop(token) {
  while (true) {
    var newToken = yield call(auth.authorize, true);
    if (newToken === null) {
      return;
    }

    yield call(delay, token.expires_in);
  }
}

export function* authentication() {
  // Check if we already have a token, if we do lets refresh right away
  let storedToken = yield call(auth.getStoredToken);
  storedToken.expires_in = 0;

  while (true) {
    // If no token to start, wait for the user to login
    if (!storedToken) {
      const { username, password } = yield take(USER_SIGN_IN);
      storedToken = yield authorize({ username, password }, false);
      // Auth failed, wait for user to try and login again
      if (!storedToken) {
        continue;
      }
    }

    // Wait for the user to logout, or fail a refresh
    const { signOutAction, tokenRefreshFailed } = yield race({
      signOutAction: take(USER_SIGN_OUT),
      tokenRefreshFailed: call(refreshLoop, storedToken),
    });

    // if the user logged out, clear token
    if (signOutAction || tokenRefreshFailed) {
      yield call(auth.storeToken, null);
      if (tokenRefreshFailed) {
        yield put(logout);
      }
    }
  }
}
