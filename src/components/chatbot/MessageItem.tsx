import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Avatar } from './Avatar';
import { MessageBubble } from './MessageBubble';
import { MessageItemProps } from '../../types/common';
import { wp, hp, fontSize } from '../../utils/globalFunctions';

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  type = 'ai',
  containerStyle,
  showLabel = true,
}) => {
  const isAI: boolean = type === 'ai';

  return (
    <View style={[styles.messageContainer, containerStyle]}>
      <View style={[styles.messageRow, isAI ? styles.aiRow : styles.userRow]}>
        {isAI && <Avatar type="ai" style={{ marginRight: wp(3) }} />}

        <MessageBubble message={message} type={type} />

        {!isAI && <Avatar type="user" style={{ marginLeft: wp(3) }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: fontSize(14),
    color: '#666',
    fontWeight: '500',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
});
