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
    this.state = {
      invite_code: '',
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.frame}>
        <Image
          style={styles.logo}
          source={require('../../resources/bridgesIcon.png')}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={text => this.setState({invite_code: text})}
          // onBlur={() => setFieldTouched('username')}
          placeholder="Enter Invite Code"
        />
        <Button
          title="Submit"
          onPress={() =>
            this.props.navigation.navigate('Home', {
              resource: '/invite/' + this.state.invite_code,
            })
          }
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Text style={styles.navtext}>Login</Text>
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
  textinput: {
    fontSize: 20,
    width: '75%',
    //alignSelf: "stretch",
    textAlign: 'center',
    //alignItems: "center",
    height: 40,
    paddingBottom: 8,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 25,
    borderColor: '#607D8B',
    borderWidth: 4,
    color: '#FFFFFF',
  },
});
