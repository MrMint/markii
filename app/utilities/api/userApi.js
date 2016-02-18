import * as api from './apiUtils';
import * as constants from './constants';

export function fetchUserDetails(token) {
  return api
    .get(constants.API_USER_URL, token)
    .then(response => api.parseJson(response));
}
