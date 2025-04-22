// GlobalPermissionChecker.js

import {Alert, Platform} from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

//check all notification if denied, request permission again
//how to use
// in your screen const isPermissionGranted = await GlobalPermissionChecker.requestPermissions(['camera', 'location']);

const permissionMap = {
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
};

export const GlobalPermissionChecker = {
  requestPermissions: async (permissions = []) => {
    try {
      const mappedPermissions = permissions.map(p => permissionMap[p]);

      const statuses: any = await checkMultiple(mappedPermissions);

      const toRequest: any[] = [];

      for (const key in statuses) {
        if (statuses[key] === RESULTS.DENIED) {
          toRequest.push(key);
        } else if (statuses[key] === RESULTS.BLOCKED) {
          showBlockedAlert();
        //   openSettings().catch(() => console.warn('Cannot open settings'));
          return false;
        }
      }

      if (toRequest.length > 0) {
        const requestStatuses: any = await requestMultiple(toRequest);

        for (const status in requestStatuses) {
          if (requestStatuses[status] !== RESULTS.GRANTED) {
            showDeniedAlert();
            return false;
          }
        }
      }

      return true; // Semua permission sudah OK
    } catch (error) {
      console.error('Global permission check error:', error);
      return false;
    }
  },
};

const showBlockedAlert = () => {
  Alert.alert(
    'Permission Required',
    'Some permissions are blocked. Please enable them manually in settings.',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open Settings', onPress: () => openSettings()},
    ],
    {cancelable: true},
  );
};

const showDeniedAlert = () => {
  Alert.alert(
    'Permission Needed',
    'We need permission to continue. Please grant it.',
    [{text: 'OK'}],
    {cancelable: true},
  );
};
