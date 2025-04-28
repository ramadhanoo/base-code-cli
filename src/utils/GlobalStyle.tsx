import {DefaultTheme, Theme} from '@react-navigation/native';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#333333',
    card: '#F0EEED',
  },
};

export const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1A1A1D',
    text: '#fff',
    card: '#3D3D3D',
  },
};
