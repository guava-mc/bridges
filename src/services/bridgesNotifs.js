import PushService from './PushService';
import {Alert, Platform} from 'react-native';
import {getSession, updateNotifId} from './storage';
import {notifications, postStatus} from '../mastoApi/mastoApi';
import {Config} from '../../config';
import BackgroundFetch from 'react-native-background-fetch';

this.notif = new PushService(
  function() {
    console.log(this);
    this.setState({registerToken: this.token, gcmRegistered: true});
  },
  // invoked when user clicks on a notification and is brought back to app
  /**
     *  {
          "foreground": false,
          "userInteraction": true,
          "message": "FROM APP.js\nnothing to show TEST REMOVE!!",
          "data": {
            "id": "2"
          },
          "badge": 10,
          "alert": "FROM APP.js\nnothing to show TEST REMOVE!!",
          "sound": null
        }

     * @param notification
     */
  function(notification) {
    console.log(JSON.stringify(notification, null, 2));
    if (!notification.foreground && notification.userInteraction) {
      getSession()
        .then(session => {
          // TODO this is where you put your logic for handling/logging user engagement with notification
          postStatus({
            // TODO remove this example
            oAuth: session.oAuth,
            status: '@' + Config.bot_name + ' hi from mobile notification',
            visibility: 'direct',
          }).catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  },
);

export const GENERIC_NOTIF = {
  title: "We've missed you in the bridges app",
  message: 'Come check out what has happened while you were away.',
};

export const HIGH_NOTIF_TITLE = name => name + ' has sent you a new message.';
export const MEDIUM_NOTIF_TITLE = (name, type) =>
  'You have a new ' + type + ' from ' + name + '.';

export const PRIORITY = {
  HIGH: ['mention'],
  MEDIUM: ['reblog', 'favourite'],
  LOW: ['follow', 'poll', null],
};

// ASSUMES sorted newest to oldest
// Returns the most recent highest PRIORITY notification
// precedence is always given to to mentions from the bridges notification bot
export const buildNotif = responseJson => {
  const new_notif = {title: '', message: ''};
  if (responseJson !== null) {
    for (let i = 0; i < responseJson.length; i += 1) {
      const notif = responseJson[i];
      if (PRIORITY.HIGH.includes(notif.type)) {
        if (notif.account.username === Config.bot_name) {
          new_notif.title = HIGH_NOTIF_TITLE(Config.bot_name);
          new_notif.message = notif.status.content.replace(/<[^>]*>/g, ''); // strip html
          break;
        } else {
          if (new_notif.title === '') {
            new_notif.title = HIGH_NOTIF_TITLE(notif.account.username);
            new_notif.message = notif.status.content.replace(/<[^>]*>/g, ''); // strip html
          }
        }
      } else if (PRIORITY.MEDIUM.includes(notif.type)) {
        if (new_notif.title === '') {
          new_notif.title = MEDIUM_NOTIF_TITLE(
            notif.account.username,
            notif.type,
          );
          new_notif.message = notif.status.content.replace(/<[^>]*>/g, ''); // strip html
        }
      }
    }
    // new_notif.message =
    //   new_notif.message + responseJson.length > 1
    //     ? ' And ' + (responseJson.length - 1) + ' new notifications.'
    //     : '';
    console.log(JSON.stringify(new_notif, null, 2));
    return new_notif;
  } else {
    return GENERIC_NOTIF;
  }
};

export const getNotifs = async text => {
  console.log(Platform.OS + ' [BackgroundFetch] start: ' + text);

  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.
  let session = await getSession();
  if (session !== null) {
    let response = await notifications(session);
    try {
      if (response.body) {
        let new_notif = await buildNotif(response.body);
        console.log(Platform.OS + ' [BackgroundFetch] response from ' + text);
        await updateNotifId(
          response.body[0] !== null ? response.body[0].id : session.since_id,
        );
        this.notif.localCustomNotif(new_notif.title, new_notif.message);
      }
    } catch (e) {
      console.log('no new notifications. ');
      // this.notif.localCustomNotif(
      //   'BRIDGES TEST',
      //   text + '\n' + 'nothing to show TEST REMOVE!!',
      // );
    }
  } else {
    console.log('no active session for notifications');
  }
};
