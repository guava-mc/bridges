/**
 * Sample React Native App for push notifications test
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushService from './PushService';
import appConfig from './app.json';
import {Config} from './config';

type Props = {};

// ex need to update with asyncStorage and proper endpoints, etc, etc
async function loggedIn() {
    try {
        let response = await fetch(
            // 'http://10.0.2.2:3000/api/v1/apps/verify_credentials',
            Config.URI + '/web/timelines/home',
            // {
            //   headers: {
            //     Authorization: 'Bearer pyjDXZVKSOUnPlDUdmOwI24hcIQUiBGR9qFPOGUdQGo',
            //   },
            // },
        );
        let responseJson = await response.url.toString().includes('home');
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

async function userToken(result) {
    // const data = new FormData();
    // data.append('utf8', '✓');
    // data.append('authenticity_token', result[0]);
    // data.append('email', result[1]);
    // data.append('password', result[2]);
    // data.append('button', '');
    // const URI = Config.URI + '/auth/sign_in';
    // const response = await fetch(URI, {
    //   method: 'POST',
    //   headers : {'Authorization': '9IyOy0lXOlCZQK0Pd7SmX0jKtZ3OTpLf2gKjE1fmRRI'},
    //   body: data,
    // }).then(response => response.text());
    // console.log(response);
    // const response2 = await fetch(URI).then(response => response.text());
    // console.log(response2);
    const URI = Config.URI + '/api/v1/notifications';
    const response = await fetch(URI, {
        headers: {
            Authorization: 'Bearer 9IyOy0lXOlCZQK0Pd7SmX0jKtZ3OTpLf2gKjE1fmRRI',
        },
    }).then(response => response.status);
    console.log(
        Platform.OS.toString() + ' GET /api/v1/notifications status: ' + response,
    );

    //TODO VERIFY CREDENTIALS TO GET USER ID
}

export default class App extends Component<Props> {
    webview = null;
    count = 0;
    constructor(props) {
        super(props);
        this.state = {
            senderId: appConfig.senderID,
            ActiveSession: {},
        };

        this.notif = new PushService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }
    componentDidMount() {
        this.loadAsync();
    }

    delay = ms => new Promise(res => setTimeout(res, ms));
    // Fetch the token from storage then navigate to our appropriate place
    loadAsync = async () => {
        // await this.delay(1250); //Remove if resources take time to load
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
        //test for auto login to webView
        const runFirst = `
      document.forms["new_user"]["user_email"].value = "asdf@asdf.com";
      document.forms["new_user"]["user_password"].value = "asdfasdf";
      document.forms.new_user.submit();
    `;

        //scrape registration info to store locally
        const scrapeForm = `
    try {
        const handleFormSubmit = event => {
          let csrf_token = document.forms["new_user"]["authenticity_token"].value;
          let email = document.forms["new_user"]["user_email"].value;
          let pwd = document.forms["new_user"]["user_password"].value;
          window.ReactNativeWebView.postMessage(csrf_token + " " + email + " " + pwd);
        };
      const form = document.forms["new_user"];
      form.addEventListener('submit', handleFormSubmit);
      } catch(e){
        window.ReactNativeWebView.postMessage('something went wrong');
        true;
        }
      true;
    `;

        console.log(Config.URI);
        // this.notif.scheduleNotif(); //test notif
        // this.notif.scheduleCustomNotif(
        //   //test notif 2
        //   'Huzzah',
        //   'Muahahahahaha',
        //   new Date(Date.now() + 20 * 60 * 1000),
        // );
        const logged = loggedIn().then(response => response === true);
        if (logged) {
            // need to update when change auth
            console.log('SIGNED ON AS: ' + this.state.activeSession);
        }
        return (
            <WebView
                ref={ref => (this.webview = ref)}
                source={{uri: Config.URI}}
                style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
                thirdPartyCookiesEnabled={true}
                injectedJavaScript={scrapeForm}
                onMessage={event => {
                    let result = event.nativeEvent.data.split(' ');
                    this.setState({tempUserInfo: result});
                    console.log(
                        Platform.OS.toString() +
                        '\nauthenticity_token: ' +
                        result[0] +
                        '\nemail: ' +
                        result[1] +
                        '\npwd: ' +
                        result[2],
                    );
                }}
                //const response = userToken(result);
                onNavigationStateChange={this.handleNavChange}
            />
        );
        // } else {
        //   return (
        //     <WebView
        //       ref={ref => (this.webview = ref)}
        //       // source={{uri: Config.URI}}
        //       source={{uri: Config.URI + '/auth/sign_in'}}
        //       style={{marginTop: Platform.OS === 'ios' ? 30 : 0}}
        //       // injectedJavaScript={runFirst}
        //       injectedJavaScript={scrapeForm}
        //       onMessage={event => {
        //         let result = event.nativeEvent.data.split(' ');
        //         this.setState({tempUserInfo: result});
        //         console.log(
        //           Platform.OS.toString() +
        //             ' auth_token: ' +
        //             result[0] +
        //             ' email: ' +
        //             result[1] +
        //             ' pwd: ' +
        //             result[2],
        //         );
        //         //const response = userToken(result);
        //       }}
        //       onNavigationStateChange={this.handleNavChange}
        //     />
        //   );
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
