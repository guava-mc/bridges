/** OG
// import React from 'react';
// import {Platform} from 'react-native';
// import {WebView} from 'react-native-webview';
// import {Properties as props} from './properties';
// // import {pushNotifications} from './services'; //push ex 2
// // import AppContainer from './AppContainer'; //push ex 2
//
// // pushNotifications.configure();
//
// const App: () => React$Node = () => {
//   console.log(props.URI);
//   return (
//     <WebView
//       source={{uri: props.URI}}
//       style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
//     />
//   );
// };

// const App = () => <AppContainer />; //push ex 2

export default App;
 * OG END
 * */

/**
 * Sample React Native App for push notifications test
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';
import PushService from './PushService';
import appConfig from './app.json';
import {Properties as config} from './properties';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
    };

    this.notif = new PushService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  render() {
      this.notif.scheduleNotif();
    return (
        <WebView
      source={{uri: config.URI}}
      style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
    />
      /**<View style={styles.container}>
        <Text style={styles.title}>
          Example app react-native-push-notification
        </Text>
        <View style={styles.spacer} />
        <TextInput
          style={styles.textField}
          value={this.state.registerToken}
          placeholder="Register token"
        />
        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif();
          }}>
          <Text>Schedule Notification in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelNotif();
          }}>
          <Text>Cancel last notification (if any)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelAll();
          }}>
          <Text>Cancel all notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.checkPermission(this.handlePerm.bind(this));
          }}>
          <Text>Check Permission</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
        <TextInput
          style={styles.textField}
          value={this.state.senderId}
          onChangeText={e => {
            this.setState({senderId: e});
          }}
          placeholder="GCM ID"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.configure(
              this.onRegister.bind(this),
              this.onNotif.bind(this),
              this.state.senderId,
            );
          }}>
          <Text>Configure Sender ID</Text>
        </TouchableOpacity>
        {this.state.gcmRegistered && <Text>GCM Configured !</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.configure(
              this.onRegister.bind(this),
              this.onNotif.bind(this),
              this.state.senderId,
            );
          }}>
          <Text>Configure Sender ID</Text>
        </TouchableOpacity>
        {this.state.gcmRegistered && <Text>GCM Configured !</Text>}

        <View style={styles.spacer} />
      </View> */
    );
  }

  onRegister(token) {
    Alert.alert('Registered !', JSON.stringify(token));
    console.log(token);
    this.setState({registerToken: token.token, gcmRegistered: true});
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
