import React, {Component} from 'react';
import {Alert, StyleSheet, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushService from '../PushService';
import appConfig from '../app.json';
import {Config} from '../config';
import OverlayIndicator from './overlayIndicator';

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
      activeSession: false,
      isLoading: true,
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
    //import state from previous state
    const {params} = this.props.navigation.state || {resource: ''};
    console.log(Config.URI + params.resource);
    // const logged = loggedIn().then(response => response === true);
    // if (!logged) {
    //   console.log('signing in user');
    //   this.props.navigation.navigate('AutoLogin');
    // } else {
    return (
      <View style={styles.overlay}>
        <WebView
          ref={ref => (this.webview = ref)}
          source={{uri: Config.URI + params.resource}}
          style={{marginTop: Platform.OS === 'ios' ? 45 : 0}}
          thirdPartyCookiesEnabled={true}
          //const response = userToken(result);
          onNavigationStateChange={this.handleNavChange}
          onLoadEnd={() => {
            if (this.state.isLoading) {
              this.setState({isLoading: false});
            }
          }}
          // renderLoading={() => <View style={styles.overlay} />}
          // startInLoadingState
        />
        {this.state.isLoading && <OverlayIndicator />}
      </View>
    );
  }

  // RICK ROLL
  handleNavChange = newNavState => {
    console.log(newNavState);
    if (newNavState.url.includes('/web') && !this.state.activeSession) {
      console.log('detected active session');
      AsyncStorage.setItem('activeSession', 'hi mom')
        .then(this.setState({activeSession: true}))
        .catch(error => console.log('error saving session ' + error));
    }
    if (
      newNavState.url.includes('/sign_out') ||
      newNavState.url.includes('/sign_in')
    ) {
      console.log('no active session');
      AsyncStorage.removeItem('activeSession')
        .then(this.setState({activeSession: false}))
        .catch(error => console.log('error saving session ' + error));
    }
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
