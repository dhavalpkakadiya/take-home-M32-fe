import { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { MessageData } from '../types/common';

interface UseChatReturn {
  messages: MessageData[];
  addMessage: (message: Omit<MessageData, 'id' | 'timestamp'>) => void;
  scrollViewRef: any
  scrollToBottom: () => void;
}

export const useChat = (initialMessages: MessageData[] = []): UseChatReturn => {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const scrollViewRef = useRef<ScrollView>(null);

  const addMessage = (message: Omit<MessageData, 'id' | 'timestamp'>): void => {
    const newMessage: MessageData = {
      ...message,
      id: Date.now(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const scrollToBottom = (): void => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return {
    messages,
    addMessage,
    scrollViewRef,
    scrollToBottom,
  };
};
