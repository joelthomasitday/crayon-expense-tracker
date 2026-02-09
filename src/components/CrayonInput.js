import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import CrayonText from './CrayonText';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../constants/Theme';

const CrayonInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => {
  return (
    <View style={styles.container}>
      {label && <CrayonText style={styles.label}>{label}</CrayonText>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.s,
  },
  label: {
    marginBottom: SPACING.xs,
    fontSize: 16,
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.text,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.text,
    borderTopRightRadius: BORDER_RADIUS.m + 3,
    borderBottomLeftRadius: BORDER_RADIUS.m + 2,
  },
});

export default CrayonInput;
