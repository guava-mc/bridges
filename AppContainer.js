//https://apiko.com/blog/react-native-push-notifications/

import React from 'react';
import {Text, View, Button} from 'react-native';
import {pushNotifications} from './src/services';

const AppContainer = () => {
  const handleOnPress = () => {
    pushNotifications.localNotification();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Press the button to see push Notification</Text>
      <Button title={'Press Me'} onPress={handleOnPress} />
    </View>
  );
};

export default AppContainer;
