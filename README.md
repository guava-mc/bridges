## bridges React Native App README


#### Requirements

* node
* watchman

##### iOS
* Xcode
* CocoaPods

##### Android
* Android Studio

#### Installing Dependencies
Follow the getting-started docs for **React Native CLI Quickstart** NOT _Expo_

https://facebook.github.io/react-native/docs/getting-started

#### Build and Run 
In order to test the application on your computer you need to have an active emulator for Android and/or iOS.

first install all the node modules from bridges/:\
`npm install`

##### Setting local [properties.js](./properties.js) 
You can change the properties.URI field to any custom page you want to be displayed when the app launches.
```
export const Properties = {
	URI: development
}
```

Simply replace 'development' with whatever URI you want. ex: `https://google.com`\
Current variable options for URI include `development` and `local`.\
`development` will launch the heal3 server.\
`local` will launch a local build using localhost and the designated `port` which by default is 3000.

##### Run Android 
You can create an emulator on Android Studio like so: [Create and Manage AVDs](https://developer.android.com/studio/run/managing-avds)

option 1: open bridges/android in Android Studio and build/run\
option 2: from Android Studio in the AVD Manager window press the green 'run' button to launch the AVD.\
option 3: find the name of your AVD and run it from the command line.\
To find names\
In Android Studio you can AVD Manager you can click to 'view details' and will see the name of the AVD.\
From command line:\
`emulator -list-avds`\
Copy the name of the emulator you want to run\
`emulator @[name-of-emulator]`\

run the app in the android AVD from the command line with:\
`react-native run-android`\

##### Run iOS 
from within bridges/ios run:\
`pod install`

option 1: open up the bridges/ios code in Xcode and build/run\
option 2: find the name of a simulator\
`xcrun simctl list devices`\
**NOTE**: There will be a lot of devices look for a tablet or phone simulator and copy the name\
ex: "iPhone 11 Pro Max"\

run the app the simulator from the command line with:\
`react-native run-ios --simulator="Name of iPhone"`

##### Potentional Issues
If you have gradlew errors you can\
`android/gradlew clean`\
or\
`chmod 755 android/gradlew`

