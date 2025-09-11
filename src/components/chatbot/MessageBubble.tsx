import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MessageBubbleProps } from '../../types/common';
import { wp, hp, fontSize } from '../../utils/globalFunctions';

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  textStyle,
  type = 'ai',
  bubbleStyle,
  maxWidth = wp(75),
}) => {
  const isAI: boolean = type === 'ai';

  return (
    <View
      style={[
        styles.messageBubble,
        {
          maxWidth,
          backgroundColor: isAI ? '#e8f4f8' : '#dc3545',
          borderBottomLeftRadius: isAI ? wp(1) : wp(4.5),
          borderBottomRightRadius: isAI ? wp(4.5) : wp(1),
        },
        bubbleStyle,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          { color: isAI ? '#333' : '#fff' },
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
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderRadius: wp(4.5),
  },
  messageText: {
    fontSize: fontSize(16),
    lineHeight: fontSize(22),
  },
});
