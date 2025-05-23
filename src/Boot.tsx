import {getPersistor} from './redux/store';
import {Routes} from './routes';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import ToastConfig from './config/ToastConfig';
import {StatusBar} from 'react-native';

const Boot = () => {
  const persistor = getPersistor();
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={'default'} />
        <Routes />
        <Toast
          config={ToastConfig}
          position={'bottom'}
          bottomOffset={100}
          visibilityTime={3000}
        />
      </PersistGate>
    </>
  );
};

export default Boot;
