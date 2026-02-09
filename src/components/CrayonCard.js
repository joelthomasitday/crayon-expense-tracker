import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/Theme';

const CrayonCard = ({ children, style, color = COLORS.white }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    borderWidth: 2,
    borderColor: COLORS.text,
    // Soft wobbly border simulation
    borderTopLeftRadius: BORDER_RADIUS.m + 2,
    borderBottomRightRadius: BORDER_RADIUS.m + 4,
    borderTopRightRadius: BORDER_RADIUS.m - 2,
    borderBottomLeftRadius: BORDER_RADIUS.m,
    
    // Shadows
    shadowColor: COLORS.text,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 4,
    
    marginVertical: SPACING.s,
  },
});

export default CrayonCard;
