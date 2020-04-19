## bridges React Native App README

#### Table of Contents

* [Requirements](#Requirements)
* [Installing Dependencies](#Installing-Dependencies)
* [Build and Run ](#Build-and-Run)
   * [Android](#Android)
   * [iOS](#iOS)
* [Troubleshooting](#Troubleshooting)

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
Follow the getting-started docs for **React Native CLI Quickstart** NOT _Expo_

https://facebook.github.io/react-native/docs/getting-started

#### Build and Run 
In order to test the application on your computer you need to have an active emulator for Android and/or iOS.

first install all the node modules from bridges/:\
`yarn install`

##### Setting local [config.js](config.js) 
You can change the Config.URI field to any custom page you want to be displayed when the app launches.
```
export const Config = {
	URI: <url>
}
```

Simply replace 'development' with whatever URI you want. ex: `https://google.com`\
Current variable options for URI include `development` and `local`.\
`development` will launch the heal3 server.\
`local` will launch a local build using localhost and the designated `port` which by default is 3000.

##### Android 
You can create an emulator on Android Studio like so: [Create and Manage AVDs](https://developer.android.com/studio/run/managing-avds)

option 1: open bridges/android in Android Studio and build/run\
option 2: from Android Studio in the AVD Manager window press the green 'run' button to launch the AVD.\
option 3: find the name of your AVD and run it from the command line.\
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

option 1: open up the bridges/ios code in Xcode and build/run\
option 2: find the name of a simulator\
`xcrun simctl list devices`\
**NOTE**: There will be a lot of devices look for a tablet or phone simulator and copy the name\
ex: "iPhone 11 Pro Max"

run the app the simulator from the command line with:\
`react-native run-ios --simulator="Name of iPhone"`

#### Troubleshooting

##### React Native

###### is the metro server running?
- `npx react-native start`

###### metro is running but it is angry
- `yarn install`
- `npx react-native start --reset-cache`, wait for the dependency graph to load and try to build again.
 
##### iOS

###### It was working before...
- `yarn install`
- `cd ios && pod install`
- `npx react-native start --reset-cache`
- `npx react-native run-ios`

##### Android 
###### If you have gradlew errors you can
`android/gradlew clean` or `chmod 755 android/gradlew`

###### Signatures do not match the previously installed version;
- on the AVD, uninstall the app and try again

###### `Unable to load script` || metro is running but after the app builds it never actually gets launched on metro
- you may need update the path in your android/ dev environment to expose metro
- from root of project, enter into command line (**this may require sudo**):
    ```bash
    mkdir android/app/src/main/assets
    ```
    ```bash
    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    ```
    ```bash
    npx react-native run-android
    ```
