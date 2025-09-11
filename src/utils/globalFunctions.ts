import { Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = (val: number): number => widthPercentageToDP(val);
export const hp = (val: number): number => heightPercentageToDP(val);

export const fontSize = (val: number): number => RFValue(val, 812);

export const isAndroid: boolean = Platform.OS === 'android';
export const isIOS: boolean = Platform.OS === 'ios';

export const resetNavigation = (routeName: string, params?: object) => {
  return CommonActions.reset({
    index: 0,
    routes: [{ name: routeName, params }],
  });
};

export const navigateAndReset = (
  navigation: any,
  routeName: string,
  params?: object,
) => {
  navigation.dispatch(resetNavigation(routeName, params));
};

export const goBack = (navigation: any) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};

export const storeData = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

export const getData = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

export const getAllKeys = async (): Promise<any> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return d.toLocaleDateString('en-US', options);
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const getDeviceInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    isAndroid,
    isIOS,
  };
};

export const screenDimensions = {
  width: wp(100),
  height: hp(100),
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value: any, minLength: number): boolean => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (
  value: string,
  maxLength: number,
): boolean => {
  return !value || value.length <= maxLength;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: any;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const removeDuplicates = <T>(array: T[], key?: keyof T): T[] => {
  if (key) {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex(t => t[key] === item[key]),
    );
  }
  return [...new Set(array)];
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const handleError = (
  error: any,
  defaultMessage = 'An error occurred',
) => {
  console.error('Error:', error);

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return defaultMessage;
};

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  CHAT_HISTORY: 'chat_history',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
export type PlatformOS = typeof Platform.OS;

export {
  CommonActions,
  AsyncStorage,
  Platform,
  widthPercentageToDP,
  heightPercentageToDP,
  RFValue,
};
