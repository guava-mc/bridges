/**
 * Sample React Native App for push notifications test
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushService from './PushService';
import appConfig from './app.json';
import {Config} from './config';
import AppNavigation from './components/navigation';
import BackgroundFetch from 'react-native-background-fetch';
import Splash from './components/splash';

type Props = {};

export default class App extends Component<Props> {
  componentDidMount() {
    // Configure it.
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        // Android options
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
        enableHeadless: true,
      },
      () => {
        console.log('[js] Received background-fetch event');
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );
    // Optional: Query the authorization status.
    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }

  webview = null;

  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      ActiveSession: {},
    };

    this.notif = new PushService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  render() {
    this.notif.scheduleNotif(); //test notif
    this.notif.scheduleFutureSelfNotif(
        //test notif 2
        'FutureSelf 1',
        '1',
        new Date(Date.now() + 60 * 1000 * 15),
    );
    this.notif.scheduleCustomNotif(
      //test notif 2
      'og2',
      '2',
      new Date(Date.now() + 5000),
    );
    this.notif.scheduleCustomNotif(
        //test notif 2
        'og3',
        '3',
        new Date(Date.now() + 60 * 1000 * 15),
    );
    this.notif.scheduleCustomNotif(
        //test notif 2
        'og4',
        '4',
        new Date(Date.now() + 15000),
    );
    this.notif.cancelNotifWithId(3);
    console.log(Config.URI);
    // return <AppNavigation />;
    return <AppNavigation />;
  }

  // RICK ROLL
  handleNavChange = newNavState => {
    console.log(newNavState);
    // if (newNavState.url.includes('/auth/setup')) {
    //   console.log('getting App Auth');
    //   this.webview.injectJavaScript(
    //     'window.location = http://0.0.0.0:3000/oauth/authorize?response_type=code&client_id=7iMqLghqWXYxy4utJFkHIn77Yl9AMtSMNKcp_oH60pI&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=read%20write%20follow%20push',
    //   );
    // }
  };

  onRegister(token) {
    Alert.alert('Registered !', JSON.stringify(token));
    console.log(token);
    this.setState({registerToken: token.token, gcmRegistered: true});
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}
