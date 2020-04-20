import AsyncStorage from '@react-native-community/async-storage';

export async function getOAuth() {
  // TODO update when session object is changed
  return AsyncStorage.getItem('activeSession')
    .then(auth_token => auth_token.substring(1,auth_token.length - 1))
    .catch(error => console.log(error));
}

export async function updateSession(newSession) {
  return '';
}

export async function getSession() {
  console.log('getting session data');
  return AsyncStorage.getItem('activeSession').catch(error =>
    console.log(error),
  );
}

export async function endSession() {
  return AsyncStorage.removeItem('activeSession')
    .then(() => {
      console.log('ending session');
    })
    .catch(error => console.log(error));
}
