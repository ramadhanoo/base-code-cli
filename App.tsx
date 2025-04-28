import {
  NavigationContainer,
} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {Boot} from './src';
import {Provider} from 'react-redux';
import {getStore} from './src/redux/store';
import Toast from 'react-native-toast-message';
import ToastConfig from './src/config/ToastConfig';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '@/utils/GlobalStyle';
import { navigationRef } from '@/utils/NavigationService';

const App = () => {
  const routeNameRef = useRef<string>(null);
  const store = getStore();
  const scheme = useColorScheme();

  const handleStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName as string;
    }
  }, []);

  // if you need
  // useEffect(() => {
  //   const setupNotification = async () => {
  //     await NotificationService.requestPermission();
  //     await NotificationService.getFcmToken();
  //     NotificationService.listenBackgroundNotification();
  //     NotificationService.handleNotificationOpenedApp((remoteMessage) => {
  //       NotificationService.navigateFromNotification(remoteMessage);
  //     });
  //   };

  //   setupNotification();

  //   const unsubscribe = NotificationService.listenForegroundNotification((remoteMessage) => {
  //     NotificationService.navigateFromNotification(remoteMessage);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={scheme === 'dark' ? DarkTheme : LightTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()
            ?.name as string;
        }}
        onStateChange={handleStateChange}>
        <Boot />
      </NavigationContainer>
      <Toast
        config={ToastConfig}
        position={'bottom'}
        bottomOffset={100}
        visibilityTime={3000}
      />
    </Provider>
  );
};

export default App;
