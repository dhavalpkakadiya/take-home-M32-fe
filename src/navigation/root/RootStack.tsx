import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors, commonStyles } from '../../helper';
import { ChatBot, Landing, Login, SignUp } from '../../modules';

const LoggedOutScreens = {
  Landing: Landing,
  Login: Login,
  SignUp: SignUp,
};

const LoggedInScreens = {
  ChatBot: ChatBot,
};

type NavigationLoggedOutParamList = {
  [K in keyof typeof LoggedOutScreens]: undefined;
};

type NavigationLoggedInParamList = {
  [K in keyof typeof LoggedInScreens]: undefined;
};

type RootStackParamList = NavigationLoggedOutParamList &
  NavigationLoggedInParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const LoggedOutStack =
  createNativeStackNavigator<NavigationLoggedOutParamList>();

const LoggedInStack = createNativeStackNavigator<NavigationLoggedInParamList>();

const RootStack = () => {
  const [isAuthResolved, setIsAuthResolved] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      setIsLoggedIn(!!user);
      setIsAuthResolved(true);
    });

    return unsubscribe;
  }, []);

  if (!isAuthResolved)
    return (
      <View style={[commonStyles.flexCenterContainer, styles.loaderContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
          {Object.entries(LoggedInScreens).map(([name, component]) => (
            <LoggedInStack.Screen
              key={name}
              name={name as keyof NavigationLoggedInParamList}
              component={component}
            />
          ))}
        </LoggedInStack.Navigator>
      ) : (
        <LoggedOutStack.Navigator screenOptions={{ headerShown: false }}>
          {Object.entries(LoggedOutScreens).map(([name, component]) => (
            <LoggedOutStack.Screen
              key={name}
              name={name as keyof NavigationLoggedOutParamList}
              component={component}
            />
          ))}
        </LoggedOutStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: colors.background,
  },
});
