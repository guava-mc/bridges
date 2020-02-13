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
import PushService from './PushService';
import appConfig from './app.json';
import {Config} from './config';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
    };

    // this.notif = new PushService(
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    // );
  }

  render() {
    console.log(Config.URI);
    // this.notif.scheduleNotif();
    // this.notif.scheduleCustomNotif("Huzzah", "Muahahahahaha", new Date(Date.now() + 20 * 60 * 1000))
    return (
      <WebView
        source={{uri: Config.URI}}
        style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
      />
    );
  }

  // onRegister(token) {
  //   Alert.alert('Registered !', JSON.stringify(token));
  //   console.log(token);
  //   this.setState({registerToken: token.token, gcmRegistered: true});
  // }
  //
  // onNotif(notif) {
  //   console.log(notif);
  //   Alert.alert(notif.title, notif.message);
  // }
  //
  // handlePerm(perms) {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // }
}
