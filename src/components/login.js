import React, {Component} from 'react';
import WebView from 'react-native-webview';
import {Config} from '../../config';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {USER_APP_AUTHORIZATION} from '../mastoApi/mastoApi';

export default class Login extends Component {
  render() {
    return (
      <WebView
        source={{uri: Config.URI + USER_APP_AUTHORIZATION}}
        style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
        onNavigationStateChange={this.handleNavChange}
        thirdPartyCookiesEnabled={true}
      />
    );
  }

  handleNavChange = newNavState => {
    console.log('LOGIN.js: ' + JSON.stringify(newNavState));
    const url = newNavState.url;
    if (url.includes('/web/timelines/home')) {
      this.props.navigation.navigate('Home');
    }
  };
}
