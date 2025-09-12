import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Linking } from 'react-native';
import MarkdownIt from 'markdown-it';

import { wp, hp, fs, colors } from '../../helper';
import { MessageBubbleProps } from '../../declarations';

export const MessageBubble = ({
  message,
  textStyle,
  bubbleStyle,
}: MessageBubbleProps) => {
  const isAI: boolean = message.type === 'ai';
  const md = new MarkdownIt({ typographer: true, linkify: true });

  const markdownBodyStyle = StyleSheet.flatten([
    styles.messageText,
    { color: colors.white },
    textStyle,
  ]);

  return (
    <View
      style={[
        styles.messageBubble,
        {
          backgroundColor: !isAI ? colors.secondary : colors.primary,
          borderBottomLeftRadius: isAI ? wp(1) : wp(16),
          borderBottomRightRadius: isAI ? wp(16) : wp(1),
        },
        bubbleStyle,
      ]}
    >
      <View style={styles.messageContent}>
        {isAI ? (
          <Markdown
            markdownit={md}
            style={{ body: markdownBodyStyle }}
            onLinkPress={(url: string) => {
              Linking.openURL(url);
              return true;
            }}
          >
            {message.text}
          </Markdown>
        ) : (
          <Text
            style={[
              styles.messageText,
              textStyle,
              !isAI && [styles.userTextAlignment],
            ]}
          >
            {message.text}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    paddingHorizontal: wp(15),
    paddingVertical: hp(4),
    borderRadius: wp(16),
    maxWidth: '90%',
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: fs(14),
    lineHeight: fs(18),
  },

  userTextAlignment: {
    alignSelf: 'flex-end',
    color: colors.textPrimary,
    marginVertical: hp(5),
  },
});
