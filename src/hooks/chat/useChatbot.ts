import { useCallback, useState, useEffect } from 'react';

import { getAuth } from '@react-native-firebase/auth';

import {
  SessionListItem,
  getSessionMessages,
  getSessionsWithLatest,
} from '../../firebase/functions';
import { User } from '../../declarations';
import { sendChatMessage } from '../../api';
import { getUser, storeChat } from '../../firebase';
import { generateUniqueId, strings } from '../../helper';
import { ChatRequest, ChatResponse, MessageData } from '../../declarations';

interface UseChatbotReturn {
  user?: User | null;
  message: string;
  messages: MessageData[];
  isTyping: boolean;
  handleMessageChange: (text: string) => void;
  sendMessage: () => Promise<void>;
  handleStartNewChat: () => void;
  currentSessionId: string;
  sessions: SessionListItem[];
  loadingSessions: boolean;
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  onMenuPress: () => Promise<void>;
  onSelectSession: (sessionId: string) => Promise<void>;
}

export function useChatbot(): UseChatbotReturn {
  const createInitialMessages = useCallback((): MessageData[] => {
    return [
      {
        id: generateUniqueId(),
        type: 'ai',
        text: strings.chat_initial_ai_message,
        timestamp: new Date(),
      },
    ];
  }, []);

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageData[]>(
    createInitialMessages(),
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string>(() => generateUniqueId());
  const [sessions, setSessions] = useState<SessionListItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);

  const handleMessageChange = useCallback((text: string) => {
    setMessage(text);
  }, []);

  // resetChat was previously exposed but is no longer used

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

  const selectSession = useCallback(
    async (newSessionId: string) => {
      const uid = getAuth().currentUser?.uid;
      setIsTyping(false);
      if (!uid || !newSessionId) {
        setSessionId(generateUniqueId());
        setMessages(createInitialMessages());
        return;
      }
      try {
        const existingMessages = await getSessionMessages(uid, newSessionId);
        if (existingMessages && existingMessages.length > 0) {
          setMessages(existingMessages);
        } else {
          setMessages(createInitialMessages());
        }
        setSessionId(newSessionId);
        setMessage('');
      } catch (e) {
        setSessionId(newSessionId);
        setMessages(createInitialMessages());
      }
    },
    [createInitialMessages],
  );

  const openDrawer = useCallback(async () => {
    setIsDrawerOpen(true);
    setLoadingSessions(true);
    try {
      const uid = getAuth().currentUser?.uid;
      if (uid) {
        const list = await getSessionsWithLatest(uid);
        setSessions(list);
      } else {
        setSessions([]);
      }
    } catch (e) {
      setSessions([]);
    } finally {
      setLoadingSessions(false);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const onMenuPress = useCallback(async () => {
    await openDrawer();
  }, [openDrawer]);

  const onSelectSession = useCallback(
    async (id: string) => {
      await selectSession(id);
      closeDrawer();
    },
    [selectSession, closeDrawer],
  );

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

  const startNewChat = useCallback(() => {
    // If already a fresh session (only initial AI message), no-op
    if (messages.length <= 1) return;
    setSessionId(generateUniqueId());
    setMessages(createInitialMessages());
    setMessage('');
    setIsTyping(false);
  }, [messages.length, createInitialMessages]);

  const handleStartNewChat = useCallback(() => {
    if (messages.length <= 1) return;
    startNewChat();
  }, [messages.length, startNewChat]);

  return {
    user,
    message,
    messages,
    isTyping,
    sessions,
    isDrawerOpen,
    loadingSessions,
    currentSessionId: sessionId,
    closeDrawer,
    onMenuPress,
    sendMessage,
    onSelectSession,
    handleStartNewChat,
    handleMessageChange,
  };
}
