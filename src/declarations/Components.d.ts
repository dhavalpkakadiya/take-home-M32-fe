import { TextInputProps as RNTextInputProps, StyleProp } from 'react-native';
import { MessageData } from './Chat';

export interface MarginProps {
  allowHMargin?: boolean;
  allowVMargin?: boolean;
  allowMargin?: boolean;
}
export interface ButtonProps extends MarginProps {
  container?: StyleProp<ViewStyle>;
  type?: 'primary' | 'secondary';
  text: string;
  onPress: () => void;
}

export interface TextInputProps extends RNTextInputProps, MarginProps {
  title?: string;
  container?: ViewStyle;
  inputStyle?: TextStyle;
  titleStyle?: TextStyle;
  isPassword?: boolean;
  errorMessage?: string;
}

export interface HeaderProps {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  container?: ViewStyle;
  titleStyle?: TextStyle;
  allowHMargin?: boolean;
}


export interface MessageBubbleProps {
  message: MessageData;
  maxWidth?: number;
  textStyle?: TextStyle;
  bubbleStyle?: ViewStyle;
}

export interface ChatInputFieldProps {
  value: string;
  onSend: () => void;
  maxLength?: number;
  placeholder?: string;
  inputStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  sendButtonStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
}

export interface MessageItemProps {
  name: string;
  message: MessageData;
  containerStyle?: ViewStyle;
}
