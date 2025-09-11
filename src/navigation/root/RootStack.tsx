import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Landing, Login, SignUp } from '../../modules';

const Navigation = createNativeStackNavigator({
  initialRouteName: 'Landing',
  screenOptions: {
    headerShown: false,
  },
  screens: {
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
