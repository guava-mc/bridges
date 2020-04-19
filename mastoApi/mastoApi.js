import {Platform} from 'react-native';
import {Config} from './config';

/**
 *
 * @param options ex:
 * {
    headers: {Authorization: "Bearer <token>"},
    resource: endpoint,
    operation: VERB,
    payload: {}
 * }
 * @returns {Promise<any>}
 */
function call_api(options) {
  console.log(JSON.stringify(options, null, 2));
  const headers = options.headers || {};
  headers.Accept = 'application/json';
  headers['Content-Type'] = 'application/json';
  console.log('fetching data from: ' + Config.URI + options.resource);
  return fetch(Config.URI + options.resource, {
    method: options.operation,
    headers: headers,
    timeout: 3000, // req/res timeout in ms, 0 to disable, timeout reset on redirect
    body: JSON.stringify(options.payload),
  })
    .then(response =>
      response.json().then(body => ({statusCode: response.status, body: body})),
    )
    .catch(error => {
      console.log(error);
    });
}
