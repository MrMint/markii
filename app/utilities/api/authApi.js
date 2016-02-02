import * as api from './apiUtils';
import * as constants from './constants';

export function getToken(username, password) {
  return api
    .get(constants.API_GET_TOKEN_URL, { username, password })
    .then(response => {
      return api.parseJson(response);
    });
}
