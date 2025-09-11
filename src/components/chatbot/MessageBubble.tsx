import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { wp, hp, fs, colors } from '../../helper';
import { MessageBubbleProps } from '../../declarations';

export const MessageBubble = ({
  message,
  textStyle,
  type = 'ai',
  bubbleStyle,
}: MessageBubbleProps) => {
  const isAI: boolean = type === 'ai';

  return (
    <View
      style={[
        styles.messageBubble,
        {
          backgroundColor: !isAI ? colors.secondary : colors.primary,
          borderBottomLeftRadius: isAI ? wp(3.75) : wp(16.875),
          borderBottomRightRadius: isAI ? wp(16.875) : wp(3.75),
        },
        bubbleStyle,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          { color: !isAI ? colors.textPrimary : colors.white },
          textStyle,
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    paddingHorizontal: wp(15),
    paddingVertical: hp(12.18),
    borderRadius: wp(16.875),
    maxWidth: '80%',
  },
  messageText: {
    fontSize: fs(16),
    lineHeight: fs(22),
  },
});
