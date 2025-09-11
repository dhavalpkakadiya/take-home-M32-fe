import { TextInputProps as RNTextInputProps } from 'react-native';

export interface MarginProps {
  allowHMargin?: boolean;
  allowVMargin?: boolean;
  allowMargin?: boolean;
}
export interface ButtonProps extends MarginProps {
  container?: ViewStyle;
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
  leftIcon?: ImageSourcePropType;
  container?: ViewStyle;
  titleStyle?: TextStyle;
  allowHMargin?: boolean;
}
