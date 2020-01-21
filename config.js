import {Platform} from 'react-native';

const port = ':3000';
const local =
  'http://' + (Platform.OS === 'ios' ? 'localhost' : '10.0.2.2') + port;
const heal3 = 'https://heal3.poly.asu.edu';
const development = heal3;
const v1_3 = 'https://nrd.li/about'; //works
const v3_0_1 = 'https://linuxrocks.online';
const grr = '';
export const Config = {
  URI: local,
};
