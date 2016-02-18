import * as api from './apiUtils';
import * as constants from './constants';

export function getToken(username, password) {
  return api
    .get(constants.API_GET_TOKEN_URL, { username, password })
    .then(response => api.parseJson(response))
    .then(parsedToken => {
      const d = new Date();
      const token = parsedToken;
      token.expires_on = (d.getTime() / 1000) + token.expires_in;
      return token;
    });
}
