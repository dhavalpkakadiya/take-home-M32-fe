import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { getAuth, signOut } from '@react-native-firebase/auth';

import {
  hp,
  wp,
  icons,
  isIOS,
  colors,
  strings,
  commonStyles,
} from '../../helper';
import {
  Header,
  MessageItem,
  ChatInputField,
  SessionsDrawer,
  TypingIndicator,
} from '../../components';
import { MessageData } from '../../declarations';
import { useChatbot } from '../../hooks/chat/useChatbot';

const ChatBot = () => {
  const {
    user,
    message,
    messages,
    isTyping,
    sessions,
    isDrawerOpen,
    loadingSessions,
    currentSessionId,
    closeDrawer,
    onMenuPress,
    sendMessage,
    onSelectSession,
    handleStartNewChat,
    handleMessageChange,
  } = useChatbot();

  const scrollViewRef = useRef<ScrollView>(null);
  const { bottom } = useSafeAreaInsets();

  const userName = user?.name?.charAt(0)?.toUpperCase() || '';

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

  // Using onMenuPress and onSelectSession directly from the hook

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        title={strings.chat_title}
        onLeftPress={onMenuPress}
        leftIcon={icons.menu}
        rightIcon={icons.add}
        onRightPress={handleStartNewChat}
      />

      <KeyboardAvoidingView
        style={commonStyles.flex}
        behavior={isIOS ? 'padding' : undefined}
      >
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
          onFocus={scrollToBottom}
          containerStyle={{
            paddingBottom: keyboardHeight
              ? keyboardHeight + bottom
              : hp(bottom),
          }}
        />
      </KeyboardAvoidingView>

      <SessionsDrawer
        open={isDrawerOpen}
        sessions={sessions}
        loading={loadingSessions}
        userName={user?.name}
        currentSessionId={currentSessionId}
        onClose={closeDrawer}
        onSelectSession={onSelectSession}
        onPressLogout={onLogoutPress}
      />
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
});

export default ChatBot;
