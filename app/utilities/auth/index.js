import { UserAuthWrapper as userAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
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

export function isTokenExpired(token) {
  const d = new Date();
  return d.getDate() >= token.expires_on;
}

export function secondsUntilTokenExpires(token) {
  const d = new Date();
  return token.expires_on - (d.getTime() / 1000);
}

export const userIsAuthenticated = userAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});
