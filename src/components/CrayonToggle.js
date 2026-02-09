import React from 'react';
import { Pressable, View, StyleSheet, Animated } from 'react-native';
import CrayonText from './CrayonText';
import { COLORS, SPACING } from '../constants/Theme';

const CrayonToggle = ({ label, value, onValueChange }) => {
  const moveAnim = React.useRef(new Animated.Value(value ? 24 : 4)).current;

  React.useEffect(() => {
    Animated.spring(moveAnim, {
      toValue: value ? 24 : 4,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <CrayonText style={styles.label}>{label}</CrayonText>
      <Pressable 
        onPress={() => onValueChange(!value)} 
        style={[
          styles.track, 
          { backgroundColor: value ? COLORS.secondary : COLORS.white }
        ]}
      >
        <Animated.View style={[styles.thumb, { left: moveAnim }]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.s,
  },
  label: {
    fontSize: 16,
    color: COLORS.primary,
  },
  track: {
    width: 50,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.text,
    justifyContent: 'center',
    // Wobbly feel
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 14,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.text,
    position: 'absolute',
  },
});

export default CrayonToggle;
