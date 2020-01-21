import {Config} from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {StyleSheet, View, ActivityIndicator, Platform} from 'react-native';
import WebView from 'react-native-webview';

// async function singIn(authenticity_token) {
//   const data = new FormData();
//   data.append('utf8', '✓');
//   data.append('authenticity_token', authenticity_token);
//   data.append('email', this.state.activeSession.email);
//   data.append('password', this.state.activeSession.password);
//   data.append('button', '');
//   const URI = Config.URI + '/auth/sign_in';
//   const response = await fetch(URI, {
//     method: 'POST',
//     headers: {Authorization: this.state.activeSession.token},
//     body: data,
//   }).then(response => response.text());
//   console.log(response);
//   const response2 = await fetch(URI).then(response => response.text());
//   console.log(response2);
//   this.props.navigation.navigate('home');
// }

export default class AutoLogin extends React.Component {
  webview = null;
  activeSession = {};
  autoSignIn = '';
  constructor() {
    super();
  }

  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.loadAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  loadAsync = async () => {
    await AsyncStorage.getItem('activeSession')
      .then(activeSession => {
        //FOR TEST
        this.activeSession = {
          email: 'asdf@asdf.com',
          password: 'asdfasdf',
        };
        //END FOR TEST
        console.log('session: ' + activeSession);
        // if (this.activeSession !== null) {
        //   JSON.parse(activeSession);
        // this.activeSession = activeSession;
        //test for auto login to webView
        this.autoSignIn = `
        var login = (function() {
        var executed = false;
        return function() {
          if(!executed) {
            executed = true;
          document.forms["new_user"]["user_email"].value = "${
            this.activeSession.email
          }";
          document.forms["new_user"]["user_password"].value = "${
            this.activeSession.password
          }";
          document.forms.new_user.submit();
          }
          };
          })();
          
          login();
          `;
        // }
      })
      .then(done => {
        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({error});
        this.setState({
          isLoading: false,
        });
      });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    console.log('injected:\n' + this.autoSignIn);
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{uri: Config.URI + '/auth/sign_in'}}
        style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
        thirdPartyCookiesEnabled={true}
        injectedJavaScript={this.autoSignIn}
        onMessage={event => {
          this.props.navigation.navigate('Home');
        }}
      />
    );
  }
  handleNavChange = newNavState => {
    if (!this.setState.isLoading) {
      console.log(newNavState);
      this.setState({isLoading: true});
      // if (!this.state.isLoading && newNavState.url.includes('home')) {
      this.props.navigation.navigate('Home');
    }
    // }
  };
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
