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
  let auth;
  if (credentials.username && credentials.password) {
    auth = { authorization: credentials.username + credentials.password };
  } else {
    auth = { bearer: credentials };
  }

  return fetch(url, {
    method,
    headers: auth,
  })
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
