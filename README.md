## bridges React Native App README

#### Table of Contents

* [Requirements](#Requirements)
* [Installing Dependencies](#Installing-Dependencies)
* [Build and Run ](#Build-and-Run)
   * [Setting Config Properties](#Setting-Config-Properties)
   * [Obtaining Client App Access](#Obtaining-Client-App-Access)
   * [Android](#Android)
   * [iOS](#iOS)
* [Notifications](#Notifications)
* [NavigationLogs](#NavigationLogs)   
* [Troubleshooting](#Troubleshooting)

#### Requirements

* node
* yarn
* watchman
* bridges server
* [Client App Access]((#Obtaining-Client-App-Access)) 

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

##### Setting Config Properties [config.js](config.js) 
Config Properties are separated into `localConfig`, `devConfig`, and `prodConfig` JSONObjects. Which object is used when building the apps is determined by the `isLocal` and `isProd` booleans as shown in the Table below. Set the values for each property in whichever object you need. 

| Config Object | isLocal | isProd | 
|:---:|:---:|:---:|
| localConfig | T | F |
| devConfig | F | F |
| prodConfig | * | T | 

* `localConfig`  when building the app to use with bridges server on localhost\
* `devConfig`  when building the app to use with bridges development server\
* `prodConfig`  when building the app to use with bridges production server

```javascript
_Config = {
  URI: baseURL, // ex: 'https://bridges.server.edu'
  client_name: 'The Name of the OAuthd App',  // see Obtaining Client App Access
  website: baseURL, // ex: 'https://bridges.server.edu'
  redirect_uris: baseURL, // ex: 'https://bridges.server.edu'
  scope: 'read write follow push', // grant app all user privilege scopes
  client_id: client_id, // see Obtaining client app access
  client_secret: client_secret, // see Obtaining Client App Access
  bot_name: '', // name of the bot used to send adherence notifications
}
```

##### Obtaining Client App Access

To obtain client app access you must first have a live instance of your bridges server. Creating the client app only needs to be performed one time and then the app can be used for all users.

example curl for Obtaining Client App Access:
```
curl -X POST \
	-F 'client_name=LocalAndroidApp' \
	-F 'redirect_uris=http://10.0.2.2:3000' \
	-F 'scopes=read write follow push' \
	-F 'website=http://10.0.2.2:3000' \
	http://10.0.2.2:3000/api/v1/apps
```

example response:
```json
{
    "id": "18",
    "name": "LocalAndroidApp",
    "website": "http://10.0.2.2:3000",
    "redirect_uri": "http://10.0.2.2:3000",
    "client_id": "unique id string",
    "client_secret": "unique secret string",
    "vapid_key": "unique vapid key"
}
```

Update your config object with the response properties. You are now set to build your bridges app!

**NOTE: for local tests, since Android and iOS use different hosts you must create a separate app for each platform where `redirect_uri` is `http://localhost:3000` for iOS and `http://10.0.2.2:3000` for Android, for development and production you only need to create a single app and it will be used on both platforms.**



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
`npx react-native run-android`

##### iOS 
from within bridges/ios run:\
`pod install`

option 1: open up the bridges/ios code in Xcode and build/run\
option 2: find the name of a simulator\
`xcrun simctl list devices`\
**NOTE**: There will be a lot of devices look for a tablet or phone simulator and copy the name\
ex: "iPhone 11 Pro Max"

run the app the simulator from the command line with:\
`npx react-native run-ios --simulator="Name of iPhone"`

#### Notifications
In App notifications service runs every 15 minutes the app is in the background, GETs user's notifications and filters by priority given below. **Precedence is always given to mentions from the bridges notification bot.**

Notification logic is handled in [bridgesNotifs](src/services/bridgesNotifs.js)
```javascript
PRIORITY = {
    HIGH: ['mention'],
    MEDIUM: ['reblog', 'favourite'],
    LOW: ['follow', 'poll', null],
};
```

#### Navigation Logs
Every time the webview navigates to a new page it is logged in [home.handleNavChange](src/views/home.js) this can be used to log use in the future. 

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
