import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fs, wp } from './layoutUtils';

export const commonStyles = StyleSheet.create({
  flex: { flex: 1 },
  flexGrow: { flexGrow: 1 },
  allowVMargin: { marginVertical: wp(8) },
  allowHMargin: { marginHorizontal: wp(16) },
  center: { justifyContent: 'center', alignItems: 'center' },
  allowMargin: { marginVertical: wp(8), marginHorizontal: wp(16) },
  primaryText: {
    fontSize: fs(16),
    color: colors.textPrimary,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
