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
import Splash from './components/splash';

type Props = {};

export default class App extends Component<Props> {
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
    this.notif.scheduleCustomNotif(
      //test notif 2
      'Huzzah',
      'Muahahahahaha',
      new Date(Date.now() + 20 * 60 * 1000),
    );
    console.log(Config.URI);
    // return <AppNavigation />;
    return <AppNavigation/>
  }

  // } else {
  //   return (
  //     <WebView
  //       ref={ref => (this.webview = ref)}
  //       // source={{uri: Config.URI}}
  //       source={{uri: Config.URI + '/auth/sign_in'}}
  //       style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
  //       // injectedJavaScript={runFirst}
  //       injectedJavaScript={scrapeForm}
  //       onMessage={event => {
  //         let result = event.nativeEvent.data.split(' ');
  //         this.setState({tempUserInfo: result});
  //         console.log(
  //           Platform.OS.toString() +
  //             ' auth_token: ' +
  //             result[0] +
  //             ' email: ' +
  //             result[1] +
  //             ' pwd: ' +
  //             result[2],
  //         );
  //         //const response = userToken(result);
  //       }}
  //       onNavigationStateChange={this.handleNavChange}
  //     />
  //   );
  // }
  // }

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
