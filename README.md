# BIDashboards

react-native app to view metabase dashboards

## Languages

react-native

## Getting started

### Preliminary steps

1. make sure you have the `react-native-cli` installed (`npm install –g react-native-cli`)
1. run `npm install`

### Run Android app

1. make sure `npm start` is running - otherwise the `gradle build` will fail
1. open Android project (in the `/android` directory) in Android Studio
1. wait for the `gradle sync` and `gradle build` to finish (takes a few minutes)
1. run `react-native start`
1. run project in virtual device

Alternatively, you could simply run `react-native run-android` but we have faced some issues with this command

### Run iOS app

1. navigate to the `ios` directory and run `pod install`
1. run `react-native run-ios` in the root directory
