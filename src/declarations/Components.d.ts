import { TextInputProps as RNTextInputProps, StyleProp } from 'react-native';
import { SessionListItem } from '../firebase/functions';
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
  onFocus?: () => void;
}

export interface MessageItemProps {
  name: string;
  message: MessageData;
  containerStyle?: ViewStyle;
}

export interface LoaderProps {
  visible: boolean;
}

export interface SessionsDrawerProps {
  open: boolean;
  sessions: SessionListItem[];
  loading: boolean;
  userName?: string;
  currentSessionId?: string;
  onClose: () => void;
  onSelectSession: (sessionId: string) => void;
  onPressLogout?: () => void;
}
