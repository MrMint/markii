import * as constants from './constants';
import localforage from 'localforage';

export function storeToken(token) {
  return localforage.setItem(constants.AUTH_TOKEN_STORAGE_KEY, token);
}

export function getStoredToken() {
  return localforage.getItem(constants.AUTH_TOKEN_STORAGE_KEY);
}
