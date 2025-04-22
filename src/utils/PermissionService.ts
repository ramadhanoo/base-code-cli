// PermissionService.js

import {Platform} from 'react-native';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
  Permission,
} from 'react-native-permissions';

//how to use
//const isGranted = await PermissionService.requestCameraPermission(); in your screen

export const PermissionService = {
  requestCameraPermission: async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    return await handlePermission(permission as Permission);
  },
};

const handlePermission = async (permission: Permission) => {
  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('Permission unavailable on this device.');
        return false;
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      case RESULTS.LIMITED:
        console.log('Permission limited.');
        return true;
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        console.log('Permission blocked, opening settings.');
        openSettings().catch(() => console.warn('Cannot open settings'));
        return false;
    }
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};
