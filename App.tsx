import {
  NavigationContainer,
  NavigationContainerRef,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {Boot} from './src';
import {Provider} from 'react-redux';
import {getStore} from './src/redux/store';
import {StackParamList} from './src/routes';
import Toast from 'react-native-toast-message';
import ToastConfig from './src/config/ToastConfig';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '@/utils/GlobalStyle';

const App = () => {
  const navigationRef =
    createNavigationContainerRef<NavigationContainerRef<StackParamList>>();
  const routeNameRef = useRef<string>(null);
  const store = getStore();
  const scheme = useColorScheme();

  const handleStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName as string;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
