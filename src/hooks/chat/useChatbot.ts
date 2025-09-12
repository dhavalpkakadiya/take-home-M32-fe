import { useCallback, useMemo, useState, useEffect } from 'react';

import { getAuth } from '@react-native-firebase/auth';

import { User } from '../../declarations';
import { generateUniqueId } from '../../helper';
import { sendChatMessage } from '../../api/chat';
import { getUser, storeChat } from '../../firebase';
import { strings } from '../../helper/constants/strings';
import { ChatRequest, ChatResponse, MessageData } from '../../declarations';

interface UseChatbotReturn {
  message: string;
  messages: MessageData[];
  isTyping: boolean;
  handleMessageChange: (text: string) => void;
  sendMessage: () => Promise<void>;
  resetChat: () => void;
  user?: User | null;
}

export function useChatbot(): UseChatbotReturn {
  const initialMessages: MessageData[] = useMemo(
    () => [
      {
        id: generateUniqueId(),
        type: 'ai',
        text: strings.chat_initial_ai_message,
        timestamp: new Date(),
      },
    ],
    [],
  );

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [sessionId] = useState<string>(() => generateUniqueId());

  const handleMessageChange = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const resetChat = useCallback(() => {
    setMessages(initialMessages);
    setMessage('');
    setIsTyping(false);
  }, [initialMessages]);

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) return;
    (async () => {
      try {
        const u = await getUser(uid);
        setUser(u ?? null);
      } catch (e) {
        setUser(null);
      }
    })();
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const newUserMessage: MessageData = {
      id: generateUniqueId(),
      type: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      const uid = getAuth().currentUser?.uid;
      if (uid && sessionId) {
        await storeChat(
          uid,
          sessionId,
          newUserMessage,
          messages.length <= 1,
        ).catch(() => {});
      }

      const body: ChatRequest = {
        prompt: trimmed,
        isNewChat: messages.length <= 1,
      };

      const data = (await sendChatMessage(body)) as ChatResponse;
      console.log('data', data);
      if (data?.answer) {
        const toMarkdownLinks = (text: string): string => {
          const urlRegex = /(https?:\/\/[^\s)]+)\b/g;
          return text
            .replace(urlRegex, (url: string) => `[${url}](${url})`)
            .replace(/\n\[/g, '\n- [');
        };

        let aiText = toMarkdownLinks(data.answer);
        if (Array.isArray(data.papers_used) && data.papers_used.length > 0) {
          const refsMarkdown = data.papers_used
            .map(paper => `- [${paper.title}](${paper.url})`)
            .join('\n');
          aiText = `${aiText}\n\n**References**\n\n${refsMarkdown}`;
        }

        const aiResponse: MessageData = {
          id: generateUniqueId(),
          type: 'ai',
          text: aiText,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);

        if (uid && sessionId) {
          // Fire-and-forget persist ai message
          await storeChat(uid, sessionId, aiResponse, false).catch(() => {});
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  }, [message, messages.length, sessionId]);

  return {
    user,
    message,
    messages,
    isTyping,
    resetChat,
    sendMessage,
    handleMessageChange,
  };
}
