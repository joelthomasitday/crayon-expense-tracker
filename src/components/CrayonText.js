import React from 'react';
import { Text } from 'react-native';
import { FONTS, COLORS } from '../constants/Theme';

const CrayonText = ({ children, style, ...props }) => {
  return (
    <Text 
      style={[{ 
        fontFamily: FONTS.regular, 
        color: COLORS.text,
        fontSize: 18,
      }, style]} 
      {...props}
    >
      {children}
    </Text>
  );
};

export default CrayonText;
