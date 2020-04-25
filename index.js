/**
 * @format
 */

import {Alert, AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import PushService from './PushService';
import {Config} from './config';
import {notifications} from './mastoApi/mastoApi';
import {getSession, updateNotifId} from './services/storage';
import {getNotifs} from './services/bridgesNotifs';

this.id = 0;
AppRegistry.registerComponent(appName, () => App);

let MyHeadlessTask = async () => {
  getNotifs('INDEX.js').then(
    BackgroundFetch.finish('com.transistorsoft.fetch'),
  );
};

// // Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
