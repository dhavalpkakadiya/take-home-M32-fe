import React, { useState, useRef, useEffect } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  KeyboardEvent,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { wp, hp } from '../../utils/globalFunctions';
import {
  Header,
  MessageItem,
  MessageData,
  ChatInputField,
} from '../../components/chatbot';

type RootStackParamList = {
  ChatBot: undefined;
  Home: undefined;
};

type ChatBotNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChatBot'
>;

interface ChatBotProps {
  navigation?: ChatBotNavigationProp;
}

const ChatBot: React.FC<ChatBotProps> = ({ navigation }) => {
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

  const handleBackPress = (): void => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Back pressed - no navigation provided');
    }
  };

  const handleMessageChange = (text: string): void => {
    setMessage(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBackButton={true}
        title="Business AI Assistant"
        onBackPress={handleBackPress}
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
            showLabel={true}
            message={msg.text}
          />
        ))}

        {isTyping && (
          <MessageItem
            type="ai"
            key="typing"
            showLabel={false}
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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
  },
  typingIndicator: {
    opacity: 0.7,
  },
});

export default ChatBot;
