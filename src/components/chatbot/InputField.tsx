import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ChatInputFieldProps } from '../../types/common';
import { wp, hp, fontSize, isAndroid } from '../../utils/globalFunctions';

export const ChatInputField: React.FC<ChatInputFieldProps> = ({
  value,
  onSend,
  inputStyle,
  onChangeText,
  containerStyle,
  maxLength = 500,
  sendButtonStyle,
  placeholder = 'Type your message...',
}) => (
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
        <Text style={styles.sendButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: isAndroid ? hp(1.5) : hp(3),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp(6),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: fontSize(16),
    maxHeight: hp(12),
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  sendButton: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(3),
    elevation: 2,
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: fontSize(18),
    fontWeight: '600',
  },
});
