import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components';
import { colors, commonStyles, fs, hp, icons, wp, strings } from '../../helper';

const Landing = () => {
  const navigation = useNavigation();

  const onSignupPress = () => {
    navigation.navigate('SignUp');
  };

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.flexGrow}
      >
        <View style={styles.welcomeContainer}>
          <Image source={icons.bot} style={styles.botIcon} />
          <Text style={styles.botName}>{strings.bot_name}</Text>
          <Text style={styles.welcome}>{strings.welcome}</Text>
        </View>

        <Button text={strings.signup} allowHMargin onPress={onSignupPress} />
        <Button
          text={strings.login}
          type={'secondary'}
          container={styles.loginBtnContainer}
          allowHMargin
          onPress={onLoginPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  botName: {
    fontSize: fs(22),
    color: colors.textPrimary,
    fontWeight: '800',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: fs(18),
    color: colors.textPrimary,
  },
  botIcon: {
    width: wp(75),
    height: wp(75),
    resizeMode: 'contain',
  },

  loginBtnContainer: { marginVertical: hp(16) },
});

export default Landing;
