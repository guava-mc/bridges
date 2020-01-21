import React, {Component} from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushService from '../PushService';
import appConfig from '../app.json';
import {Config} from '../config';

type Props = {};

// ex need to update with asyncStorage and proper endpoints, etc, etc
async function loggedIn() {
  try {
    let response = await fetch(Config.URI + '/web/timelines/home');
    let responseJson = await response.url.toString().includes('home');
    console.log('logged in: ' + responseJson);
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

export default class Home extends Component<Props> {
  webview = null;
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      activeSession: {},
    };
  }
  componentDidMount() {
    this.loadAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  loadAsync = async () => {
    AsyncStorage.getItem('activeSession')
      .then(activeSession => {
        console.log('session: ' + activeSession);
        this.setState({activeSession: activeSession});
      })
      .catch(error => {
        console.log({error});
      });
  };

  render() {
    console.log(Config.URI);
    const logged = loggedIn().then(response => response === true);
    // if (!logged) {
    //   console.log('signing in user');
    //   this.props.navigation.navigate('AutoLogin');
    // } else {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{uri: Config.URI}}
        style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
        thirdPartyCookiesEnabled={true}
        //const response = userToken(result);
        onNavigationStateChange={this.handleNavChange}
      />
    );
    // }
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
