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
    this.state = {};
  }

  render() {
    console.log(Config.URI);
    return (
      <WebView
        source={{uri: Config.URI}}
        style={{marginTop: Platform.OS === 'ios' ? 45 : 0}}
      />
    );
  }
}
