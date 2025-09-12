import firestore from '@react-native-firebase/firestore';

import { MessageData, User } from '../declarations';
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
