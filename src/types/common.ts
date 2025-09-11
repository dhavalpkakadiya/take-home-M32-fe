import { TextStyle, ViewStyle } from 'react-native';

export interface HeaderProps {
  title: string;
  titleStyle?: TextStyle;
  onBackPress?: () => void;
  showBackButton?: boolean;
  containerStyle?: ViewStyle;
  backButtonStyle?: ViewStyle;
}

export interface AvatarProps {
  size?: number;
  text?: string;
  imageUri?: string;
  style?: ViewStyle;
  textColor?: string;
  type?: 'ai' | 'user';
  backgroundColor?: string;
}

export interface MessageBubbleProps {
  message: string;
  maxWidth?: number;
  type?: 'ai' | 'user';
  textStyle?: TextStyle;
  bubbleStyle?: ViewStyle;
}

export interface ChatInputFieldProps {
  value: string;
  onSend: () => void;
  maxLength?: number;
  placeholder?: string;
  inputStyle?: TextStyle;
  keyboardHeight?: number;
  containerStyle?: ViewStyle;
  sendButtonStyle?: ViewStyle;
  onChangeText: (text: string) => void;
}

export interface MessageItemProps {
  message: string;
  type?: 'ai' | 'user';
  showLabel?: boolean;
  containerStyle?: ViewStyle;
}

export interface MessageData {
  id: number;
  text: string;
  timestamp: Date;
  type: 'ai' | 'user';
}

export interface ButtonProps {
  title: string;
  loading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
  textStyle?: TextStyle;
  activeOpacity?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
}
