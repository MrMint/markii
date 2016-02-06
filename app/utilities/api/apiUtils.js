import { b64EncodeUnicode } from '../index';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJson(response) {
  return response.json();
}

function fetchHelper(url, method, credentials) {

  const params = { method };
  // todo refactor credentials, this is gross
  if (credentials) {
    if (credentials.username && credentials.password) {
      params.headers = {
        authorization: b64EncodeUnicode(`${credentials.username}:${credentials.password}`),
      };
    } else if (credentials.key) {
      params.headers = { key: credentials.key };
    } else {
      params.headers = { bearer: credentials };
    }
  }
  return fetch(url, params)
  .then(checkStatus);
}

export function get(url, credentials) {
  return fetchHelper(url, 'get', credentials);
}

export function post(url, credentials) {
  return fetchHelper(url, 'post', credentials);
}
