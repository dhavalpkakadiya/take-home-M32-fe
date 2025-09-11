import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { ButtonProps } from '../../types/common';
import { wp, hp, fontSize } from '../../utils/globalFunctions';

export const Button: React.FC<ButtonProps> = ({
  style,
  title,
  onPress,
  textStyle,
  size = 'medium',
  loading = false,
  disabled = false,
  variant = 'primary',
  activeOpacity = 0.8,
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
      ...styles[`${variant}Button`],
    };

    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  const getTextStyle = () => ({
    ...styles.buttonText,
    ...styles[`${size}Text`],
    ...styles[`${variant}Text`],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? '#dc3545' : '#fff'}
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  // Size variants
  smallButton: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    minHeight: hp(4),
  },
  mediumButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    minHeight: hp(5.5),
  },
  largeButton: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    minHeight: hp(7),
  },

  // Color variants
  primaryButton: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  secondaryButton: {
    backgroundColor: '#2c5530',
    borderColor: '#2c5530',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#dc3545',
  },

  // Text styles
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: fontSize(12),
  },
  mediumText: {
    fontSize: fontSize(14),
  },
  largeText: {
    fontSize: fontSize(16),
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#dc3545',
  },
});
