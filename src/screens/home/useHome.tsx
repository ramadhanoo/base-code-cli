import {useAppDispatch} from '@/redux/store';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {clearState} from '@/redux/slices/AuthSlice';
import {useGetUsersQuery} from '@/redux/api/users';

export function useHome() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  // const authState = useSelector((state: RootState) => state.auth);
  const [isFetch, setIsFetch] = useState<string>();
  const {
    data: users,
    isLoading,
  } = useGetUsersQuery(undefined, {
    skip: !isFetch,
  });
  // const route = useRoute<RouteProp<StackParamList, typeof PATHS.LOGIN>>();
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(clearState());
  }, []);

  const hitUser = () => {
    setIsFetch(Math.random().toString());
    console.log('result', isFetch);
    // dispatch(getUser());
  };

  return {
    navigation,
    action: {
      onLogout,
      hitUser,
    },
    state: {
      users,
      isLoading,
    },
  };
}
