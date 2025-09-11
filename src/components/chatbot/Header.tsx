import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { HeaderProps } from '../../types/common';
import { wp, hp, fontSize } from '../../utils/globalFunctions';

export const Header: React.FC<HeaderProps> = ({
  title,
  titleStyle,
  onBackPress,
  containerStyle,
  backButtonStyle,
  showBackButton = true,
}) => (
  <View style={[styles.header, containerStyle]}>
    {showBackButton && (
      <TouchableOpacity
        style={[styles.backButton, backButtonStyle]}
        activeOpacity={0.7}
        onPress={onBackPress}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    )}
    <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: wp(8),
    height: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  backArrow: {
    fontSize: fontSize(24),
    color: '#000',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
});
