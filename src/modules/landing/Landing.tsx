import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, fs, icons, wp } from '../../helper';
import { strings } from '../../helper/constants/strings';
import { Button } from '../../components';

const Landing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image source={icons.bot} style={styles.botIcon} />
        <Text style={styles.botName}>{strings.bot_name}</Text>
        <Text style={styles.welcome}>{strings.welcome}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
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
  buttonContainer: {
    flex: 0.2,
  },
});

export default Landing;
