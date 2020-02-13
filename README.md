## bridges React Native App README

#### Table of Contents

* [Requirements](#Requirements)
* [Installing Dependencies](#Installing-Dependencies)
* [Build and Run ](#Build-and-Run)
   * [Android](#Android)
   * [iOS](#iOS)

#### Requirements

* node
* yarn
* watchman

##### iOS
* Xcode
* CocoaPods

##### Android
* Android Studio

#### Installing Dependencies
**Important** Follow the getting-started docs for your OS following the **React Native CLI Quickstart** NOT _Expo_\
_(You will have to select React Native CLI Quickstart)_

https://facebook.github.io/react-native/docs/getting-started

#### Build and Run 
In order to test the application on your computer you need to have an active emulator for Android and/or iOS.

first install all the node modules from bridges/:\
`yarn install`

##### Setting local [config.js](config.js) 
You can change the Config.URI field to any custom page you want to be displayed when the app launches.
```
export const Config = {
	URI: development
}
```

Simply replace 'development' with whatever URI you want. ex: `https://google.com`\
Current variable options for URI include `development` and `local`.\
`development` will launch the heal3 server.\
`local` will launch a local build using localhost and the designated `port` which by default is 3000.

##### Android 
You can create an emulator on Android Studio like so: [Create and Manage AVDs](https://developer.android.com/studio/run/managing-avds)

launch AVD with API >= 28 
from Android Studio in the AVD Manager window press the green 'run' button to launch the AVD.\
OR\
find the name of your AVD and run it from the command line.\
To find names\
In Android Studio you can AVD Manager you can click to 'view details' and will see the name of the AVD.\
From command line:\
`emulator -list-avds`\
Copy the name of the emulator you want to run\
`emulator @[name-of-emulator]`

run the app in the android AVD from the command line with:\
`react-native run-android`

##### iOS 
from within bridges/ios run:\
`pod install`

find the name of a simulator\
`xcrun simctl list devices`\
**NOTE**: There will be a lot of devices look for a tablet or phone simulator and copy the name\
ex: "iPhone 11 Pro Max"

run the app the simulator from the command line with:\
`npx react-native run-ios --simulator="Name of iPhone"`

##### Potentional Issues
If you have gradlew errors you can\
`android/gradlew clean`\
or\
`chmod 755 android/gradlew`

If you get a regex error with metro make sure you are on a LTS version of node, if you are and it is still not working revert to v12.10.00 or edit the regex following:
[stackoverflow page](https://stackoverflow.com/questions/58120990/how-to-resolve-the-error-on-react-native-start/58122821#58122821)
