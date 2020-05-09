/**
 * @format
 */

import {Alert, AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import {getNotifs} from './src/services/bridgesNotifs';

this.id = 0;
AppRegistry.registerComponent(appName, () => App);

// if Android and app is closed getNotifs
let MyHeadlessTask = async () => {
  getNotifs('INDEX.js').then(
    BackgroundFetch.finish('com.transistorsoft.fetch'),
  );
};

// // Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
