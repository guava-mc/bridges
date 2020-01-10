import {Platform} from 'react-native';

var port = ':3000';
var local =
  'http://' + (Platform.OS === 'ios' ? 'localhost' : '10.0.2.2') + port;
var heal3 = 'https://heal3.poly.asu.edu/web/timelines/home';
var development = heal3;

export const Properties = {
  URI: development,
};
