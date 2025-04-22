// NotificationService.ts

import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { navigate } from './NavigationService';

class NotificationService {
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  navigateFromNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    if (remoteMessage?.data?.navigate) {
      const screen = remoteMessage.data.navigate;
      const params = { ...remoteMessage.data };
      console.log('Navigating to screen:', screen, 'with params:', params);
      navigate(screen, params);
    }
  }

  async getFcmToken(): Promise<string> {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  }

  listenForegroundNotification(callback?: (message: FirebaseMessagingTypes.RemoteMessage) => void) {
    return messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Foreground Notification:', remoteMessage);
      if (callback) {
        callback(remoteMessage);
      } else {
        Alert.alert(
          remoteMessage.notification?.title || 'Notification',
          remoteMessage.notification?.body || ''
        );
      }
    });
  }

  listenBackgroundNotification() {
    messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Background Notification:', remoteMessage);
      // bisa proses notif di background
    });
  }

  handleNotificationOpenedApp(callback?: (message: FirebaseMessagingTypes.RemoteMessage) => void) {
    messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      if (callback) {
        callback(remoteMessage);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
          if (callback) {
            callback(remoteMessage);
          }
        }
      });
  }
}

export default new NotificationService();
