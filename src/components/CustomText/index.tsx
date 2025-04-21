import React from 'react';
import {Text, TextProps} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TypeFonts} from '@/types/common';

type CustomTextProps = TextProps & {
  children: React.ReactNode;
  type?: TypeFonts;
  size?: number;
  color?: string;
};

const CustomText: React.FC<CustomTextProps> = ({
  type = TypeFonts.REGULAR,
  children,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  color = useTheme().colors.text,
  size = 12,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: type,
          color: color,
          fontSize: size,
        },
        props.style,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;
