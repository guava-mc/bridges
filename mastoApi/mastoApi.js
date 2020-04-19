import {Platform} from 'react-native';
import {Config} from '../config';

/**
 *
 * @returns {Promise<any>}
 */
export const authorizeApp = () => {
  return call_api(USER_APP_AUTHORIZATION, {
    method: 'GET',
  });
};

/**
 *
 * @param code
 * @returns {Promise<any>}
 */
export const userAppToken = code => {
  let formData = new FormData();
  formData.append('client_id', Config.client_id);
  formData.append('client_secret', Config.client_secret);
  formData.append('redirect_uri', Config.redirect_uris);
  formData.append('scope', Config.scope);
  formData.append('code', code);
  formData.append('grant_type', 'authorization_code');
  return call_api(USER_APP_TOKEN, {
    method: 'POST',
    body: formData,
  });
};

/**
 *
 * @param options ex:
 * {
    headers: {Authorization: "Bearer <token>"},
    resource: endpoint,
    operation: VERB,
    body: new FormData()
 * }
 * @returns {Promise<any>}
 */
function call_api(resource, options) {
  console.log('fetching data from: ' + Config.URI + resource);
  console.log(JSON.stringify(options, null, 2));
  return fetch(Config.URI + resource, options)
    .then(response =>
      response.json().then(body => ({statusCode: response.status, body: body})),
    )
    .catch(error => {
      console.log(error);
    });
}

// exported to use in WebView this URI is user facing to accept authorization
export const USER_APP_AUTHORIZATION =
  '/oauth/authorize?response_type=code' +
  `&client_id=${Config.client_id}` +
  `&redirect_uri=${Config.redirect_uris}` +
  `&scope=${Config.scope}`;

const USER_APP_TOKEN = '/oauth/token';
