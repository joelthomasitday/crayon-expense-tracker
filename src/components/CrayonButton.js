import React from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';
import CrayonText from './CrayonText';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/Theme';

const CrayonButton = ({ title, onPress, color = COLORS.primary, textColor = COLORS.white, style }) => {
  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, borderColor: COLORS.text },
        style,
      ]}
    >
      <Animated.View style={{ transform: [{ scale: animatedScale }], alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <CrayonText style={[styles.text, { color: textColor }]}>{title}</CrayonText>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.s,
    // Slightly offset shadow for a hand-drawn feel
    shadowColor: COLORS.text,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default CrayonButton;
