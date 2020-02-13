//https://apiko.com/blog/react-native-push-notifications/
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const configure = () => {
  PushNotification.configure({
    onRegister: function(token) {
      //process token
      console.log('generated push TOKEN:', token);
    },

    senderID: 'NEED FOR REMOTE',

    onNotification: function(notification) {
      // process the notification
      // required on iOS only
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};

const localNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    bigText: 'My big text that will be shown when notification is expanded',
    subText: 'This is a subText',
    color: 'green',
    vibrate: true,
    vibration: 300,
    title: 'Notification Title',
    message: 'Notification Message',
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]',
  });
};

export {configure, localNotification};
/** OG
 // import React from 'react';
 // import {Platform} from 'react-native';
 // import {WebView} from 'react-native-webview';
 // import {Config as props} from './properties';
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
 *
  */
