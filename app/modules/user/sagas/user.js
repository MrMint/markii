import { takeLatest } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';
import { USER_SIGN_IN_SUCCESS } from '../constants';
import { fetchUserDetails as fetchUserDetailsApi } from '../../../utilities/api/userApi';
import {
  getUserDetails,
  getUserDetailsSuccess,
  getUserDetailsFailure,
} from '../actions/index';

function* fetchUserDetails(action) {
  try {
    const { token } = action.payload;
    yield put(getUserDetails());
    const userDetails = yield fetchUserDetailsApi(token);
    yield put(getUserDetailsSuccess(userDetails));
  } catch (e) {
    yield put(getUserDetailsFailure(e));
  }
}

function* watchUserSignInSuccess() {
  yield takeLatest(USER_SIGN_IN_SUCCESS, fetchUserDetails);
}

export function* user() {
  yield fork(watchUserSignInSuccess);
}
