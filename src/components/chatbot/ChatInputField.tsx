import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { wp, hp, fs, icons, colors, strings } from '../../helper';
import { ChatInputFieldProps } from '../../declarations';

export const ChatInputField = ({
  value,
  onSend,
  inputStyle,
  onChangeText,
  onFocus,
  containerStyle,
  maxLength = 500,
  sendButtonStyle,
  placeholder = strings.chat_input_placeholder,
}: ChatInputFieldProps) => (
  <View style={[styles.inputContainer, containerStyle]}>
    <View style={styles.inputWrapper}>
      <TextInput
        multiline
        value={value}
        returnKeyType="send"
        blurOnSubmit={false}
        maxLength={maxLength}
        onSubmitEditing={onSend}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholderTextColor={colors.border}
        style={[styles.textInput, inputStyle]}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          { opacity: value.trim() ? 1 : 0.5 },
          sendButtonStyle,
        ]}
        onPress={onSend}
        activeOpacity={0.8}
        disabled={!value.trim()}
      >
        <Image style={styles.sendIcon} source={icons.send} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: wp(15),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: hp(12.18),
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: wp(22.5),
    paddingHorizontal: wp(15),
    paddingVertical: hp(12.18),
    fontSize: fs(16),
    maxHeight: hp(97.44),
    textAlignVertical: 'top',
    color: colors.textPrimary,
  },
  sendButton: {
    borderRadius: wp(20.625),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(11.25),
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: wp(10),
  },
  sendIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
