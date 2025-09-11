import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { HeaderProps } from '../../declarations';
import { colors, fs, hp, icons, wp } from '../../helper';

const Header = ({
  title,
  leftIcon,
  container,
  titleStyle,
  allowHMargin,
  onLeftPress,
}: HeaderProps) => {
  return (
    <View
      style={[styles.container, allowHMargin && styles.allowHMargin, container]}
    >
      <TouchableOpacity style={styles.leftContainer} onPress={onLeftPress}>
        <Image source={leftIcon ?? icons.chevronLeft} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp(10),
  },
  allowHMargin: { marginHorizontal: wp(24) },
  title: {
    color: colors.textPrimary,
    fontSize: fs(24),
    fontWeight: '700',
    textAlign: 'center',
    flex: 0.8,
  },
  backIcon: {
    width: wp(26),
    height: wp(26),
    resizeMode: 'contain',
  },
  leftContainer: {
    position: 'absolute',
    left: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Header;
