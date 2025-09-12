import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { HeaderProps } from '../../declarations';
import { colors, fs, hp, icons, wp } from '../../helper';

const Header = ({
  title,
  leftIcon,
  container,
  rightIcon,
  titleStyle,
  allowHMargin,
  onLeftPress,
  onRightPress,
}: HeaderProps) => {
  return (
    <View
      style={[styles.container, allowHMargin && styles.allowHMargin, container]}
    >
      {onLeftPress && (
        <TouchableOpacity
          style={[styles.iconContainer, styles.leftContainer]}
          onPress={onLeftPress}
        >
          <Image
            source={leftIcon ?? icons.chevronLeft}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      )}

      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {onRightPress && (
        <TouchableOpacity
          style={[styles.iconContainer, styles.rightContainer]}
          onPress={onRightPress}
        >
          <Image source={rightIcon} style={styles.backIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp(10),
    paddingVertical: hp(5),
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
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 1,
  },
  leftContainer: {
    left: wp(16),
  },
  rightContainer: {
    right: wp(16),
  },
});

export default Header;
