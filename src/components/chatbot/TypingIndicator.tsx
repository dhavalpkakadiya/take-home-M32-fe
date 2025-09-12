import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import { wp, hp, fs, colors } from '../../helper';

export const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  // Animation configuration
  const JUMP_DURATION = 150;
  const PAUSE_DURATION = 100;

  // Helper function to create jump animation for a single dot
  const createJumpAnimation = (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: JUMP_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: JUMP_DURATION,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    // Create the complete sequence: dot1 → dot2 → dot3 → pause
    const createSequenceAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          createJumpAnimation(dot1), // First dot jumps
          createJumpAnimation(dot2), // Second dot jumps
          createJumpAnimation(dot3), // Third dot jumps
          Animated.delay(PAUSE_DURATION), // Pause before repeating
        ]),
      );
    };

    const animation = createSequenceAnimation();
    animation.start();

    return () => animation.stop();
  }, [dot1, dot2, dot3]);

  // Animation interpolation configuration
  const JUMP_HEIGHT = -4;

  // Create translateY interpolations for each dot
  const createTranslateY = (animatedValue: Animated.Value) => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, JUMP_HEIGHT],
    });
  };

  const translateY1 = createTranslateY(dot1);
  const translateY2 = createTranslateY(dot2);
  const translateY3 = createTranslateY(dot3);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.dotsContainer}>
          {/* First dot */}
          <Animated.Text
            style={[styles.dot, { transform: [{ translateY: translateY1 }] }]}
          >
            •
          </Animated.Text>
          {/* Second dot */}
          <Animated.Text
            style={[styles.dot, { transform: [{ translateY: translateY2 }] }]}
          >
            •
          </Animated.Text>
          {/* Third dot */}
          <Animated.Text
            style={[styles.dot, { transform: [{ translateY: translateY3 }] }]}
          >
            •
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(20.3),
  },
  bubble: {
    backgroundColor: colors.primary,
    paddingHorizontal: wp(15),
    paddingVertical: hp(8),
    borderRadius: wp(16.875),
    borderBottomLeftRadius: wp(3.75),
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    fontSize: fs(20),
    color: colors.white,
    marginHorizontal: wp(2),
  },
});
