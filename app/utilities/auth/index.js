import * as constants from './constants';
import localforage from 'localforage';
import * as authApi from '../api/authApi';

export function storeToken(token) {
  return localforage.setItem(constants.AUTH_TOKEN_STORAGE_KEY, token);
}

export function getStoredToken() {
  return localforage.getItem(constants.AUTH_TOKEN_STORAGE_KEY);
}

export function authorizeWithCredentials(username, password) {
  return authApi.getToken(username, password);
}
