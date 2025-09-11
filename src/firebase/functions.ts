import firestore from '@react-native-firebase/firestore';

import { User } from '../declarations';
import { COLLECTIONS } from './constants';

export const createUser = async (user: User) => {
  try {
    await firestore().collection(COLLECTIONS.user).add(user);
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
