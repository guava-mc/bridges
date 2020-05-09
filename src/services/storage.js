import AsyncStorage from '@react-native-community/async-storage';
import {acctCredentials, notifications} from '../mastoApi/mastoApi';

/*
  activeSession: {
    id: int,                // account id
    username: string,       // Username
    acct: string,           // Account
    oAuth: appAuthToken,    // Authorization Header token
    since_id: int,        // since_id parameter for notifications
  }
 */

/**
 *  Get the app OAuth token for the current user.
 * @returns {Promise<string | void>}
 */
export async function getOAuth() {
  // TODO update when session object is changed
  return AsyncStorage.getItem('activeSession')
    .then(auth_token => auth_token.substring(1, auth_token.length - 1))
    .catch(error => console.log(error));
}

export async function createSession(auth) {
  return acctCredentials(auth).then(acctCreds => {
    buildSessionObj(acctCreds.body, auth)
      .then(session => {
        notifications(session).then(notif => {
          session.since_id = notif.body[0] ? notif.body[0].id : 0;
          console.log(JSON.stringify(session, null, 2));
          AsyncStorage.setItem('activeSession', JSON.stringify(session));
        });
      })
      .catch(error => console.log(error));
  });
}

export async function updateNotifId(since_id) {
  getSession()
    .then(session => {
      session.since_id = since_id;
      updateSession(session);
    })
    .catch(error => console.log(error));
}

export async function updateSession(session) {
  return AsyncStorage.setItem('activeSession', JSON.stringify(session)).catch(
    error => console.log(error),
  );
}

export async function getSession() {
  console.log('getting session data');
  return AsyncStorage.getItem('activeSession')
    .then(session => JSON.parse(session))
    .catch(error => console.log(error));
}

export async function endSession() {
  return AsyncStorage.removeItem('activeSession')
    .then(() => {
      console.log('ending session');
    })
    .catch(error => console.log(error));
}

async function buildSessionObj(acctCreds, auth) {
  return {
    id: acctCreds.id,
    username: acctCreds.username,
    acct: acctCreds.acct,
    oAuth: auth,
    since_id: 0,
  };
}
