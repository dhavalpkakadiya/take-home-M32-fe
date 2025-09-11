import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';

import { TextInputProps } from '../../declarations';
import { colors, commonStyles, fs, hp, wp, icons } from '../../helper';

const TextInput = ({
  title,
  container,
  inputStyle,
  titleStyle,
  isPassword,
  placeholder,
  allowMargin,
  allowHMargin,
  allowVMargin,
  errorMessage,
  ...rest
}: TextInputProps) => {
  const [secure, setSecure] = useState(true);

  return (
    <View
      style={[
        allowHMargin && commonStyles.allowHMargin,
        allowVMargin && commonStyles.allowVMargin,
        allowMargin && commonStyles.allowMargin,
        container,
      ]}
    >
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <View style={styles.inputWrapper}>
        <RNTextInput
          style={[
            styles.input,
            commonStyles.primaryText,
            errorMessage && styles.inputError,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.border}
          {...rest}
          secureTextEntry={isPassword ? secure : rest.secureTextEntry}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecure(v => !v)}
            style={styles.iconButton}
          >
            <Image
              source={secure ? icons.eyeClose : icons.eyeOpen}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text style={[commonStyles.allowHMargin, styles.errorText]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fs(16),
    marginBottom: hp(8),
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: wp(12),
    paddingVertical: hp(12),
    paddingHorizontal: wp(16),
    backgroundColor: colors.background,
    paddingRight: wp(48),
  },
  inputError: {
    borderColor: colors.primary,
  },
  iconButton: {
    position: 'absolute',
    right: wp(12),
    height: hp(24),
    width: wp(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: hp(20),
    width: wp(20),
    tintColor: colors.textPrimary,
  },
  errorText: {
    color: colors.primary,
    marginTop: hp(6),
  },
});

export default TextInput;
