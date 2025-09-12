import { Dimensions, Platform } from 'react-native';

// Screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline design size (based on Figma design, e.g., iPhone X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Horizontal scaling function
 * Example: padding, width from Figma design → scaled proportionally
 */
const wp = (size: number): number => {
  return (SCREEN_WIDTH / guidelineBaseWidth) * size;
};

/**
 * Vertical scaling function
 * Example: height, margin, vertical spacing → scaled proportionally
 */
const hp = (size: number): number => {
  return (SCREEN_HEIGHT / guidelineBaseHeight) * size;
};

/**
 * Font scaling function
 * Takes design font size and scales it moderately
 */
const fs = (size: number): number => {
  const factor = 0.5;
  const scaledSize = wp(size); // Scale horizontally
  return size + (scaledSize - size) * factor;
};

const isIOS = Platform.OS === 'ios';

export { hp, wp, fs, SCREEN_HEIGHT, SCREEN_WIDTH, isIOS };
