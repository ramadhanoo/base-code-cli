import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useLogin} from './useLogin';
import {BaseScreen, Box, CustomText} from '@/components';
import {TypeFonts} from '@/types/common';
import Input from '@/components/Input';
import {Colors} from '@/constants/colors';
import {Controller} from 'react-hook-form';

const Login = () => {
  const {action, state, form} = useLogin();
  const {authState, setIsSecure, isSecure} = state;
  const {loading} = authState;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  return (
    <BaseScreen style={styles.container} edges={['top']}>
      <ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={styles.scroll}>
        <Box>
          <Controller
            name="username"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                parentStyle={{marginHorizontal: 20}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="username"
                errorMessage={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                parentStyle={{marginHorizontal: 20}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onRightIconPress={() => setIsSecure(!isSecure)}
                placeholder="password"
                secureTextEntry={isSecure}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </Box>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(action.onSubmit)}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <CustomText size={16} type={TypeFonts.BOLD} color={Colors.white}>
              Login
            </CustomText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: 'black',
    margin: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
});

export default Login;
