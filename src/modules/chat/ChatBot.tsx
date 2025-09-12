import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { getAuth, signOut } from '@react-native-firebase/auth';

import { Header } from '../../components';
import { MessageData } from '../../declarations';
import { colors, hp, icons, wp, strings, commonStyles } from '../../helper';
import {
  MessageItem,
  ChatInputField,
  TypingIndicator,
} from '../../components/chatbot';
import { useChatbot } from '../../hooks/chat/useChatbot';

const ChatBot = () => {
  const {
    user,
    message,
    messages,
    isTyping,
    sendMessage,
    handleMessageChange,
  } = useChatbot();

  const scrollViewRef = useRef<ScrollView>(null);
  const { bottom } = useSafeAreaInsets();

  const userName = user?.name?.charAt(0)?.toUpperCase() || '';
  console.log('user', user);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      setKeyboardHeight(e.endCoordinates.height),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessage = () => {
    sendMessage();
    scrollToBottom();
    Keyboard.dismiss();
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      Alert.alert(strings.logout_title, strings.logout_error_message);
    }
  };

  const onLogoutPress = () => {
    Alert.alert(strings.logout_title, strings.logout_confirm_message, [
      { text: strings.yes, onPress: handleLogout },
      { text: strings.no },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        title={strings.chat_title}
        onRightPress={onLogoutPress}
        rightIcon={icons.logout}
      />

      <KeyboardAvoidingView style={commonStyles.flex}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContentContainer}
        >
          {messages.map((msg: MessageData) => (
            <MessageItem
              key={msg.id}
              message={msg}
              name={msg.type === 'user' ? userName : 'AI'}
            />
          ))}

          {isTyping && <TypingIndicator />}
        </ScrollView>

        <ChatInputField
          value={message}
          onSend={handleSendMessage}
          placeholder={strings.chat_input_placeholder}
          onChangeText={handleMessageChange}
          containerStyle={{
            paddingBottom: keyboardHeight
              ? keyboardHeight + bottom
              : hp(bottom),
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    paddingHorizontal: wp(15),
    paddingTop: hp(16.24),
    paddingBottom: hp(16.24),
  },
  typingIndicator: {
    opacity: 0.7,
  },
});

export default ChatBot;
