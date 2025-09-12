import React from 'react';
import { View, Linking, Text, StyleSheet } from 'react-native';

import MarkdownIt from 'markdown-it';
import Markdown from 'react-native-markdown-display';

import { wp, hp, fs, colors } from '../../helper';
import { MessageBubbleProps } from '../../declarations';

export const MessageBubble = ({ message, bubbleStyle }: MessageBubbleProps) => {
  const isAI: boolean = message.type === 'ai';
  const md = new MarkdownIt({ typographer: true, linkify: true });

  const markdownBodyStyle = StyleSheet.flatten([
    styles.messageText,
    { color: colors.white },
  ]);

  return (
    <View
      style={[
        styles.messageBubble,
        isAI ? styles.bubbleAI : styles.bubbleUser,
        bubbleStyle,
      ]}
    >
      <View style={styles.messageContent}>
        {isAI ? (
          <Markdown
            markdownit={md}
            style={{
              body: markdownBodyStyle,
              code_inline: {
                backgroundColor: 'transparent',
                color: colors.white,
                paddingHorizontal: 0,
                paddingVertical: 0,
              },
              code_block: {
                backgroundColor: 'transparent',
                color: colors.white,
              },
              fence: {
                backgroundColor: 'transparent',
                color: colors.white,
              },
            }}
            onLinkPress={(url: string) => {
              Linking.openURL(url);
              return true;
            }}
          >
            {message.text}
          </Markdown>
        ) : (
          <Text
            style={[styles.messageText, !isAI && [styles.userTextAlignment]]}
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
    paddingVertical: hp(10),
    borderRadius: wp(16),
    maxWidth: '90%',
  },
  bubbleAI: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: wp(1),
    borderBottomRightRadius: wp(16),
  },
  bubbleUser: {
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: wp(16),
    borderBottomRightRadius: wp(1),
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
