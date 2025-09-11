import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { AvatarProps } from '../../types/common';
import { wp, fontSize } from '../../utils/globalFunctions';

export const Avatar: React.FC<AvatarProps> = ({
  text,
  style,
  imageUri,
  type = 'ai',
  size = wp(10),
  backgroundColor,
  textColor = '#fff',
}) => {
  const defaultBgColor: string = type === 'ai' ? '#2c5530' : '#8B4513';
  const defaultText: string = type === 'ai' ? 'AI' : 'U';

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
        <Text style={[styles.avatarText, { color: textColor }]}>
          {text || defaultText}
        </Text>
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
    fontSize: fontSize(14),
    fontWeight: '600',
  },
});
