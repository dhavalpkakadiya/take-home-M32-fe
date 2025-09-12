import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ButtonProps } from '../../declarations';
import { colors, commonStyles, fs, hp, wp } from '../../helper';

const Button = ({
  type,
  text,
  container,
  allowMargin,
  allowHMargin,
  allowVMargin,
  onPress,
}: ButtonProps) => {
  const isPrimary = type !== 'secondary';
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isPrimary ? styles.primaryContainer : styles.secondaryContainer,
        allowMargin && commonStyles.allowMargin,
        allowHMargin && commonStyles.allowHMargin,
        allowVMargin && commonStyles.allowVMargin,
        container,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(12),
    paddingHorizontal: wp(12),
    borderRadius: wp(12),
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
  },
  text: {
    fontSize: fs(16),
    fontWeight: '600',
  },
  primaryText: {
    color: colors.secondary,
  },
  secondaryText: {
    color: colors.primary,
  },
});

export default Button;
