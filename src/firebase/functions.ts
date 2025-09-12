import firestore from '@react-native-firebase/firestore';

import { MessageData, User } from '../declarations';
import { strings } from '../helper';
import { COLLECTIONS } from './constants';

export const createUser = async (id: string, user: User) => {
  try {
    await firestore().collection(COLLECTIONS.user).doc(id).set(user);
    return true;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const data = await firestore().collection(COLLECTIONS.user).doc(id).get();
    return data.data() as User;
  } catch (error) {
    throw error;
  }
};

export const storeChat = async (
  uid: string,
  sessionId: string,
  message: MessageData,
  isNewSession: boolean,
) => {
  try {
    const sessionRef = firestore()
      .collection(COLLECTIONS.chat)
      .doc(uid)
      .collection(COLLECTIONS.sessions)
      .doc(sessionId);

    if (isNewSession) {
      await sessionRef.set({ title: message.text });
    }

    await sessionRef
      .collection(COLLECTIONS.messages)
      .doc(message.id)
      .set(message);
    return true;
  } catch (error) {
    throw error;
  }
};

export const getSessionMessages = async (
  uid: string,
  sessionId: string,
): Promise<MessageData[]> => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.chat)
      .doc(uid)
      .collection(COLLECTIONS.sessions)
      .doc(sessionId)
      .collection(COLLECTIONS.messages)
      .orderBy('timestamp', 'asc')
      .get();

    return snapshot.docs.map(d => {
      const data = d.data() as MessageData & { timestamp?: any };
      const ts: any = data?.timestamp;
      const normalized = ts
        ? ts?.toDate
          ? ts.toDate()
          : typeof ts === 'number'
          ? new Date(ts)
          : typeof ts === 'string'
          ? new Date(ts)
          : ts?.seconds
          ? new Date(ts.seconds * 1000)
          : undefined
        : undefined;
      return { ...data, timestamp: normalized } as MessageData;
    });
  } catch (error) {
    throw error;
  }
};

export interface SessionListItem {
  id: string;
  title: string;
  latestTimestamp?: Date | string;
}

export const getSessionsWithLatest = async (
  uid: string,
): Promise<SessionListItem[]> => {
  try {
    const sessionsSnap = await firestore()
      .collection(COLLECTIONS.chat)
      .doc(uid)
      .collection(COLLECTIONS.sessions)
      .get();

    const items = await Promise.all(
      sessionsSnap.docs.map(async doc => {
        const sessionId = doc.id;
        const data = doc.data() as { title?: string } | undefined;

        const latestMsgSnap = await firestore()
          .collection(COLLECTIONS.chat)
          .doc(uid)
          .collection(COLLECTIONS.sessions)
          .doc(sessionId)
          .collection(COLLECTIONS.messages)
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();

        const rawTs: any = latestMsgSnap.docs[0]?.data()?.timestamp;
        const latestTimestamp = rawTs
          ? rawTs?.toDate
            ? rawTs.toDate()
            : typeof rawTs === 'number'
            ? new Date(rawTs)
            : typeof rawTs === 'string'
            ? new Date(rawTs)
            : rawTs?.seconds
            ? new Date(rawTs.seconds * 1000)
            : undefined
          : undefined;

        return {
          id: sessionId,
          title: data?.title ?? strings.untitled,
          latestTimestamp,
        } as SessionListItem;
      }),
    );

    return items.sort((a, b) => {
      const ta = a.latestTimestamp ? new Date(a.latestTimestamp).getTime() : 0;
      const tb = b.latestTimestamp ? new Date(b.latestTimestamp).getTime() : 0;
      return tb - ta;
    });
  } catch (error) {
    throw error;
  }
};
