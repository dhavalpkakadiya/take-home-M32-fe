import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Landing, Login } from '../../modules';

const Navigation = createNativeStackNavigator({
  initialRouteName: 'Landing',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Landing: Landing,
    Login: Login,
  },
});

const RootStack = createStaticNavigation(Navigation);

export default RootStack;
