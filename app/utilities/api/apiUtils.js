function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJson(response) {
  return response.json();
}

function fetchHelper(url, method, credentials) {

  const params = { method };
  if (credentials) {
    if (credentials.username && credentials.password) {
      params.auth = { authorization: credentials.username + credentials.password };
    } else {
      params.auth = { bearer: credentials };
    }
  }
  return fetch(url, params)
  .then(checkStatus)
  .then(response => {
    if (method === 'get') {
      return parseJson(response);
    }
    return response;
  });
}

export function get(url, credentials) {
  return fetchHelper(url, 'get', credentials);
}

export function post(url, credentials) {
  return fetchHelper(url, 'post', credentials);
}
