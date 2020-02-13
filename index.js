/**
 * @format
 */

import {Alert, AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import PushService from './PushService';
import {Config} from './config';

this.id = 0;
AppRegistry.registerComponent(appName, () => App);

this.notif = new PushService(
  function() {
    Alert.alert('Registered !', JSON.stringify(this));
    console.log(this);
    this.setState({registerToken: this.token, gcmRegistered: true});
  },
  function() {
    console.log(this.notif);
    Alert.alert(this.notif.title, this.notif.message);
  },
);

let MyHeadlessTask = async () => {
  console.log('[BackgroundFetch HeadlessTask] start');

  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.
  let response = await fetch(
    'https://facebook.github.io/react-native/movies.json',
  );
  let responseJson = await response.json();
  console.log(
    Platform.OS + ' [BackgroundFetch HeadlessTask] response: ',
    responseJson,
  );
  this.notif.scheduleCustomNotif(
    'Headless!',
    responseJson,
    new Date(Date.now() + 3 * 1000),
  );
  BackgroundFetch.finish();
};

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
