import PushService from '../PushService';
import {Alert, Platform} from 'react-native';
import {getSession, updateNotifId} from './storage';
import {notifications} from '../mastoApi/mastoApi';
import BackgroundFetch from 'react-native-background-fetch';

this.notif = new PushService(
  function() {
    // Alert.alert('Registered !', JSON.stringify(this));
    console.log(this);
    this.setState({registerToken: this.token, gcmRegistered: true});
  },
  function() {
    // console.log(this);
    // Alert.alert(this.notif.title, this.notif.message);
    // Alert.alert('hi mom');
  },
);

export const getNotifs = async text => {
  console.log(Platform.OS + ' [BackgroundFetch] start: ' + text);

  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.
  let session = await getSession();
  let response = await notifications(session);
  let responseJson = await JSON.stringify(response.body, null, 2);
  console.log(
    Platform.OS + ' [BackgroundFetch] response: ',
    responseJson,
  );
  try {
    if (response.body) {
      await updateNotifId(
        response.body[0] !== null ? response.body[0].id : session.since_id,
      );
      this.notif.localCustomNotif(text + '\n' + responseJson);
    }
  } catch (e) {
    console.log('no new notifications.');
    this.notif.localCustomNotif(text + '\n' + 'nothing to show TEST REMOVE!!');
  }
};
