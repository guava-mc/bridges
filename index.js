/**
 * @format
 */

import {Alert, AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Config} from './config';

if (Config.production) {
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
}
AppRegistry.registerComponent(appName, () => App);
