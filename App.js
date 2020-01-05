
import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Properties as props } from './properties';

const App: () => React$Node = () => {
	console.log(props.URI)
  return (
    <WebView
        source={{ uri: props.URI }}
        style={{ marginTop: Platform.OS === 'ios' ? 30 : 0}}
      />
  );
};

export default App;


