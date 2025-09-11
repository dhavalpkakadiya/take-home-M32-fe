import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { wp, fs, colors } from '../../helper';
import { AvatarProps } from '../../declarations';

export const Avatar = ({
  text,
  name,
  style,
  imageUri,
  type = 'ai',
  size = wp(37.5),
  backgroundColor,
}: AvatarProps) => {
  const defaultBgColor: string = type === 'ai' ? '#2c5530' : '#8B4513';
  const defaultText: string = type === 'ai' ? 'AI' : name || 'U';

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor || defaultBgColor,
        },
        style,
      ]}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.avatarImage, { borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={styles.avatarText}>{text || defaultText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.white,
  },
});
