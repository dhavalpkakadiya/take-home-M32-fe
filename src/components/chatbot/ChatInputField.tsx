import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { wp, hp, fs, icons, colors } from '../../helper';
import { ChatInputFieldProps } from '../../declarations';

export const ChatInputField = ({
  value,
  onSend,
  inputStyle,
  onChangeText,
  containerStyle,
  maxLength = 500,
  sendButtonStyle,
  placeholder = 'Type your message...',
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
        placeholderTextColor="#999"
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
    borderTopColor: '#e0e0e0',
    paddingHorizontal: wp(15),
    paddingTop: hp(12.18),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp(22.5),
    paddingHorizontal: wp(15),
    paddingVertical: hp(12.18),
    fontSize: fs(16),
    maxHeight: hp(97.44),
    textAlignVertical: 'top',
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
