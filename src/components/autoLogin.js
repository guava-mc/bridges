import {Config} from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {StyleSheet, View, ActivityIndicator, Platform} from 'react-native';
import WebView from 'react-native-webview';
import OverlayIndicator from './overlayIndicator';

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
  overlay = `var div = document.createElement('div');
div.id='overlay'
document.body.appendChild(div);
var css = \`#overlay {
                        position: fixed;
                        display: block;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(40,44,55,1);
                        z-index: 2;
                        cursor: pointer;
                      }\`,
                          head = document.head || document.getElementsByTagName('head')[0],
                          style = document.createElement('style');
                      
                      head.appendChild(style);
                      
                      style.type = 'text/css';
                      if (style.styleSheet){
                        // This is required for IE8 and below.
                        style.styleSheet.cssText = css;
                      } else {
                        style.appendChild(document.createTextNode(css));
                      }
                      document.getElementById("overlay").style.display = "block";
                      `;
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
        if (this.state.isLoading) {
          this.autoSignIn = `
          
          document.forms["new_user"]["user_email"].value = "${
            this.activeSession.email
          }";
          document.forms["new_user"]["user_password"].value = "${
            this.activeSession.password
          }";
          document.forms.new_user.submit();
          void(0);
          `;
        } else {
          this.autoSignIn = 'true;';
        }
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
    if (false) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      console.log('injected:\n' + this.autoSignIn);
      return (
        <View style={styles.frame}>
          <WebView
            ref={ref => (this.webview = ref)}
            source={{uri: Config.URI + ''}}
            style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
            thirdPartyCookiesEnabled={true}
            // injectedJavaScript={this.autoSignIn}
            onNavigationStateChange={this.handleNavChange}
          />
          <OverlayIndicator/>
        </View>
      );
    }
  }
  handleNavChange = newNavState => {
    if (!this.setState.isLoading) {
      console.log(newNavState);
      if (
        newNavState.title.length > 0 &&
        this.autoSignIn.length > 0)
       {
        this.webview.injectJavaScript(this.autoSignIn);
        this.autoSignIn = `
          void(0);
          `;
         if (newNavState.url.includes('home')) {
           console.log('Navigating to home')
           this.props.navigation.navigate('Home');
         }
      }
      // this.setState({isLoading: true});
      // if (!this.state.isLoading && newNavState.url.includes('home')) {
      // this.props.navigation.navigate('Home');
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
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0,
  },
});
