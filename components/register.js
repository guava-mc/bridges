import React from 'react';

import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Separator() {
  return <View style={styles.separator} />;
}

export default class Register extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.frame}>
        <Image
          style={styles.logo}
          source={require('../resources/bridgesIcon.png')}
        />
        <Button
          title="Submit"
          onPress={() => Alert.alert('TODO NAV TO WEBVIEW WITH LINK')}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text style={styles.navtext}>Already a member? Login</Text>
        </TouchableOpacity>
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
  navtext: {
    alignSelf: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'SourceSansPro-Bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonWidth: {
    width: 100,
    height: 100,
  },
});
