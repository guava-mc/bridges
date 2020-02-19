import {Platform} from 'react-native';

var port = ':3000';
var local =
  'http://' + (Platform.OS === 'ios' ? 'localhost' : '10.0.2.2') + port;
var dev3 = 'https://umm.hi.changeme.plz';
var development = dev3;

export const Config = {
  URI: development,
};
