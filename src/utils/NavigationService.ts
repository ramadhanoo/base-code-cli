// NavigationService.ts
import {PATHS} from '@/constants/paths';
import {StackParamList} from '@/routes';
import {
  createNavigationContainerRef,
  NavigationAction,
  StackActions,
} from '@react-navigation/native';

type PathType = (typeof PATHS)[keyof typeof PATHS];
export const navigationRef = createNavigationContainerRef<StackParamList>();

export function navigate<RouteName extends keyof StackParamList>(
  name: PathType,
  params?: StackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function dispatch(action: NavigationAction) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function push<RouteName extends keyof StackParamList>(
  screen: RouteName,
  params?: StackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(screen, params));
  }
}

export function resetRoot(
  routeName: keyof StackParamList,
  params?: StackParamList[keyof StackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name: routeName, params}],
    });
  }
}
