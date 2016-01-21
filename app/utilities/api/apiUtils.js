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

function fetch(url, method, credentials) {
  const params = { method };
  if (credentials.username && credentials.password) {
    params.auth = { authorization: credentials.username + credentials.password };
  } else {
    params.auth = { bearer: credentials };
  }

  return fetch(url, params)
  .then(checkStatus)
  .then(response => {
    if (method === 'get') {
      return parseJson(response);
    }
    return response;
  })
  .then(response => { return response; })
  .catch(response => { return response; });
}

export function get(url, credentials) {
  return fetch(url, 'get', credentials);
}

export function post(url, credentials) {
  return fetch(url, 'post', credentials);
}
