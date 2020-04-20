import React, {Component} from 'react';
import {Alert, StyleSheet, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushService from '../PushService';
import appConfig from '../app.json';
import {Config} from '../config';
import OverlayIndicator from './overlayIndicator';
import {
  notifications,
  USER_APP_AUTHORIZATION,
  userAppToken,
} from '../mastoApi/mastoApi';
import {createSession, getSession} from '../services/storage';

type Props = {};

// ex need to update with asyncStorage and proper endpoints, etc, etc
// async function loggedIn() {
//   try {
//     let response = await fetch(Config.URI + '/web/timelines/home');
//     let responseJson = await response.url.toString().includes('home');
//     console.log('logged in: ' + responseJson);
//     return responseJson;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default class Home extends Component<Props> {
  webview = null;
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      activeSession: null,
      isLoading: true,
      key: 1,
    };
  }
  componentDidMount() {
    this.loadAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  loadAsync = async () => {
    getSession()
      .then(async activeSession => {
        if (activeSession !== null) {
          console.log('session: ' + JSON.stringify(activeSession, null, 2));
          this.setState({activeSession: activeSession});
          this.setState({authorized: true});
          await notifications(this.state.activeSession).then(response =>
            console.log(JSON.stringify(response, null, 2)),
          );
        } else {
          this.setState({activeSession: null});
        }
      })
      .catch(error => {
        console.log({error});
      });
  };

  async getAppAuthToken(url) {
    await userAppToken(url.substring(url.indexOf('=') + 1))
      .then(response => {
        console.log(response);
        if (response.statusCode === 200) {
          createSession(response.body.access_token).then(() => {
            getSession().then(session => {
              this.setState({activeSession: session});
              this.setState({authorized: true});
              console.log(this.state.activeSession);
            });
          });
        }
      })
      .catch(error => console.log('error saving session ' + error));
  }
  render() {
    //import state from previous state
    const hasSession = this.state.activeSession !== null;
    return (
      <View style={styles.overlay}>
        <WebView
          ref={ref => (this.webview = ref)}
          key={this.state.key}
          source={{
            uri: Config.URI + (hasSession ? '' : USER_APP_AUTHORIZATION),
          }}
          style={{marginTop: Platform.OS === 'ios' ? 45 : 0}}
          thirdPartyCookiesEnabled={true}
          onNavigationStateChange={this.handleNavChange}
          onLoadEnd={() => {
            if (this.state.isLoading) {
              this.setState({isLoading: false});
            }
          }}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
        {this.state.isLoading && <OverlayIndicator />}
      </View>
    );
  }

  handleNavChange = newNavState => {
    console.log(newNavState);
    const url = newNavState.url;
    if (url.includes('?code=')) {
      this.getAppAuthToken(url);
      // } else if (url.includes('/web') && !this.state.authorized) {
      //   console.log('detected new session, getting App OAuth');
      //   this.props.navigation.navigate('Home', {
      //     resource: USER_APP_AUTHORIZATION,
      //     authorized: true,
      //   });
      // TODO GO TO autoLogin or check for log in and auto login from home.
    } else if ((url.includes('/sign_out') || url.includes('/sign_in')) && this.state.activeSession !== null) {
      // TODO if sign_out remove app auth token, if sign_in with an app auth_token, auto log in user
      console.log('no active session');
      AsyncStorage.removeItem('activeSession')
        .then(() => {
          this.setState({activeSession: null});
          this.resetWebViewToInitialUrl();
        })
        .catch(error => console.log('error ending session ' + error));
    }
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  resetWebViewToInitialUrl = () => {
    this.delay(1000);
    this.setState({
      key: this.state.key + 1,
    });
  };
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393F4F',
  },
  logo: {
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 1,
    backgroundColor: '#393F4F',
  },
});
