import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChatBot,Landing, Login, SignUp } from '../../modules';

const Navigation = createNativeStackNavigator({
  initialRouteName: 'ChatBot',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    ChatBot: ChatBot,
    Landing: Landing,
    Login: Login,
    SignUp: SignUp,
  },
});

const RootStack = createStaticNavigation(Navigation);
type RootStackParamList = StaticParamList<typeof Navigation>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default RootStack;
