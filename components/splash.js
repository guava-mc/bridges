import React from 'react';

import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import WebView from 'react-native-webview';
import {Config} from '../config';

export default class Splash extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.loadAsync();
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  // ex need to update with asyncStorage and proper endpoints, etc, etc
  loggedIn = async () => {
    try {
      let response = await fetch(Config.URI + '/web/timelines/home');
      let responseJson = await response.url.toString().includes('home');
      console.log('logged in: ' + responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the token from storage then navigate to our appropriate place
  loadAsync = async () => {
    await this.delay(1250); //Remove if resources take time to load
    AsyncStorage.getItem('activeSession')
      .then(activeSession => {
        console.log('session: ' + activeSession);
        if (activeSession !== null) {
          this.props.navigation.navigate('Home', {
            resource: '',
            authorized: true,
          }); // TODO GO TO autoLogin or check for log in and auto login from home.
        } else {
          this.props.navigation.navigate('Register');
        }
      })
      .catch(error => {
        this.setState({error});
      });
  };

  render() {
    return (
      <View style={styles.frame}>
        <Image
          style={styles.logo}
          source={require('../resources/bridgesIcon.png')}
        />
        <View style={{width: 256, height: 256}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c37',
  },
  logo: {
    width: 256,
    height: 256,
    resizeMode: 'contain',
    position: 'absolute',
    padding: 20,
  },
});
