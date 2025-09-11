import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, hp, wp } from '../../helper';

interface props {
  container?: ViewStyle;
  type?: 'primary' | 'secondary';
}

const Button = ({ container, type }: props) => {
  const isPrimary = type !== 'secondary';
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isPrimary ? styles.primaryContainer : styles.secondaryContainer,
        container,
      ]}
    >
      <Text style={[isPrimary ? styles.primaryText : styles.secondaryText]}>
        Button
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(14),
    paddingHorizontal: wp(14),
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
  },
  primaryText: {},
  secondaryText: {},
});

export default Button;
