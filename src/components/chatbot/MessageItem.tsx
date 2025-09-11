import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Avatar } from './Avatar';
import { MessageBubble } from './MessageBubble';
import { wp, hp } from '../../helper';
import { MessageItemProps } from '../../declarations';

export const MessageItem = ({
  message,
  name,
  type = 'ai',
  containerStyle,
}: MessageItemProps) => {
  const isAI: boolean = type === 'ai';

  return (
    <View style={[styles.messageContainer, containerStyle]}>
      <View style={[styles.messageRow, isAI ? styles.aiRow : styles.userRow]}>
        {isAI && <Avatar type="ai" style={{ marginRight: wp(11.25) }} />}

        <MessageBubble message={message} type={type} />

        {!isAI && (
          <Avatar name={name} type="user" style={{ marginLeft: wp(11.25) }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: hp(20.3),
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
