import React, {Component} from 'react';
import WebView from 'react-native-webview';
import {Config} from '../config';
import {Platform} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <WebView
        source={{uri: Config.URI}}
        style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
        thirdPartyCookiesEnabled={true}
      />
    );
  }
}
