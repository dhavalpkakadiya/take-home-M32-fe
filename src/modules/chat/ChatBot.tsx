import React, { useState, useRef, useEffect } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  KeyboardEvent,
  Alert,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { getAuth, signOut } from '@react-native-firebase/auth';

import { Header } from '../../components';
import { MessageData } from '../../declarations';
import { colors, hp, icons, wp } from '../../helper';
import { MessageItem, ChatInputField } from '../../components/chatbot';

const ChatBot = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: 1,
      type: 'ai',
      text: 'Hello, how can I assist you with your business today?',
      timestamp: new Date(),
    },
    {
      id: 2,
      type: 'user',
      text: 'I need help with marketing strategies for my new cafe.',
      timestamp: new Date(),
    },
  ]);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => setKeyboardHeight(e.endCoordinates.height),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const scrollToBottom = (): void => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessage = (): void => {
    if (message.trim()) {
      const newMessage: MessageData = {
        id: Date.now(),
        type: 'user',
        text: message.trim(),
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
      scrollToBottom();

      setIsTyping(true);

      setTimeout(() => {
        const aiResponse: MessageData = {
          id: Date.now() + 1,
          type: 'ai',
          text: generateAIResponse(newMessage.text),
          timestamp: new Date(),
        };

        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setIsTyping(false);
        scrollToBottom();
      }, 1500);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('marketing')) {
      return "I can help you develop effective marketing strategies for your business. Let's start by understanding your target audience and current marketing channels.";
    } else if (
      lowerMessage.includes('cafe') ||
      lowerMessage.includes('restaurant')
    ) {
      return 'Great! For a cafe business, I recommend focusing on local marketing, social media presence, and customer loyalty programs. Would you like me to elaborate on any of these areas?';
    } else if (lowerMessage.includes('help')) {
      return "I'm here to assist you with various business aspects including marketing, operations, strategy, and growth planning. What specific area would you like to explore?";
    } else {
      return "Thank you for your message. I'm here to help you with your business needs. Could you provide more details about what you'd like assistance with?";
    }
  };

  const handleMessageChange = (text: string): void => {
    setMessage(text);
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      Alert.alert('Logout', 'There is some issue while logging you out!');
    }
  };

  const onLogoutPress = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Yes', onPress: handleLogout },
      { text: 'No' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        title={'Business AI Assistant'}
        onRightPress={onLogoutPress}
        rightIcon={icons.logout}
      />

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
            type={msg.type}
            message={msg.text}
            name={''}
          />
        ))}

        {isTyping && (
          <MessageItem
            type="ai"
            key="typing"
            message="AI is typing..."
            containerStyle={styles.typingIndicator}
          />
        )}
      </ScrollView>

      <ChatInputField
        value={message}
        maxLength={500}
        onSend={handleSendMessage}
        placeholder="Type your message..."
        keyboardHeight={keyboardHeight}
        onChangeText={handleMessageChange}
        containerStyle={{ paddingBottom: hp(bottom) }}
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
  typingIndicator: {
    opacity: 0.7,
  },
});

export default ChatBot;
