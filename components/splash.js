import React from 'react';

import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.loadAsync();
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  // Fetch the token from storage then navigate to our appropriate place
  loadAsync = async () => {
    await this.delay(1250); //Remove if resources take time to load
    AsyncStorage.getItem('activeSession')
      .then(activeSession => {
        console.log('session: ' + activeSession);
        // if (activeSession !== null) {
        if (false) {
          //TODO TEST
          JSON.parse(activeSession);
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('AutoLogin');
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
  },
});
