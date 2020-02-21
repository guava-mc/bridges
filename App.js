/**
 * Sample React Native App for push notifications test
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import appConfig from './app.json';
import {Config} from './config';
import AppNavigation from './components/navigation';

type Props = {};

export default class App extends Component<Props> {
  webview = null;

  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      ActiveSession: {},
    };
  }

  render() {
    console.log(Config.URI);
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
}
