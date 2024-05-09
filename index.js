/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import config from '@src/config'
const {notificationChannelId, notificationChannelName} = config

// Creating notification channel is required. Without channel notifications don't work.
PushNotification.channelExists(notificationChannelId, function (exists) {
  console.log('Notification channel exists: ', exists); 
  if (!exists){
  PushNotification.createChannel(
    {
      channelId: notificationChannelId, // (required)
      channelName: notificationChannelName, // (required)
      channelDescription: "AutoScheduler app notification channel", 
      soundName: "default",
      importance: 4, 
      vibrate: true, 
    },
    (created) => console.log(`createChannel returned '${created}'`) 
  );
  }
});

PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });


AppRegistry.registerComponent(appName, () => App);
