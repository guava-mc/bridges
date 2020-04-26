import React, {Component} from 'react';
import {Config} from './config';
import AppNavigation from './src/components/navigation';
import BackgroundFetch from 'react-native-background-fetch';
import Splash from './src/components/splash';
import {getNotifs} from './src/services/bridgesNotifs';

type Props = {};

export default class App extends Component<Props> {
  componentDidMount() {
    // Configure Background service on launch.
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
      taskId => {
        console.log('[js] Received background-fetch event: ' + taskId);
        // if app is in background getNotifs
        getNotifs('FROM APP.js').catch(error => console.log(error));
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        BackgroundFetch.finish(taskId);
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
    this.state = {};
  }

  render() {
    console.log(Config.URI);
    return <AppNavigation />;
  }

  // RICK ROLL
  handleNavChange = newNavState => {
    console.log(newNavState);
  };
}
