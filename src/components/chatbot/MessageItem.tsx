import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MessageBubble } from './MessageBubble';
import { hp, fs, colors } from '../../helper';
import { MessageItemProps } from '../../declarations';

export const MessageItem = ({ message, containerStyle }: MessageItemProps) => {
  const isAI: boolean = message.type === 'ai';
  const timestamp = message.timestamp;

  const formatTime = (time?: Date | string): string => {
    if (!time) return '';
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={[styles.messageContainer, containerStyle]}>
      <View style={[styles.messageRow, isAI ? styles.aiRow : styles.userRow]}>
        <MessageBubble message={message} />
      </View>
      {timestamp && (
        <Text style={[styles.timestamp, !isAI && [styles.userTimestamp]]}>
          {formatTime(timestamp)}
        </Text>
      )}
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
  timestamp: {
    fontSize: fs(9),
    alignSelf: 'flex-start',
    marginTop: hp(3),
  },

  userTimestamp: {
    color: colors.textPrimary,
    alignSelf: 'flex-end',
  },
});
