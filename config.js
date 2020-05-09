import {Platform} from 'react-native';

const isLocal = false;
const isProd = false;

const port = ':3000';
const local =
  'http://' + (Platform.OS === 'ios' ? 'localhost' : '10.0.2.2') + port;

const dev = '';

const prod = '';
const client_id = '';
const client_secret = '';

const localConfig = {
  URI: local,
  client_name: 'BridgesLocal' + Platform.OS,
  website: '',
  redirect_uris: local,
  scope: 'read write follow push',
  client_id: Platform.OS === 'ios' ? '' : '',
  client_secret: Platform.OS === 'ios' ? '' : '',
  bot_name: '',
};

const devConfig = {
  URI: dev,
  client_name: 'BridgesDev',
  website: dev,
  redirect_uris: dev,
  scope: 'read write follow push',
  client_id: '',
  client_secret: '',
  bot_name: '',
};

const prodConfig = {
  URI: prod,
  client_name: 'Bridges',
  website: prod,
  redirect_uris: prod,
  scope: 'read write follow push',
  client_id: client_id,
  client_secret: client_secret,
  bot_name: '',
};

export const Config = isProd ? prodConfig : isLocal ? localConfig : devConfig;
