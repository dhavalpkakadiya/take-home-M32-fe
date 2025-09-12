import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Button from './Button';
import { colors, hp, strings, wp } from '../../helper';
import { SessionListItem } from '../../firebase/functions';
import { SessionsDrawerProps } from '../../declarations';

const SessionsDrawer = ({
  open,
  sessions,
  loading,
  userName,
  currentSessionId,
  onClose,
  onSelectSession,
  onPressLogout,
}: SessionsDrawerProps) => {
  const drawerWidth = useMemo(() => Math.min(320, wp(280)), []);
  const animatedX = useRef(new Animated.Value(-drawerWidth)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(animatedX, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedX, {
        toValue: -drawerWidth,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [open, animatedX, drawerWidth]);

  const edgePanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dx > 10 && Math.abs(g.dy) < 10,
      onPanResponderMove: (_, g) => {
        const val = Math.min(0, Math.max(-drawerWidth, g.dx - drawerWidth));
        animatedX.setValue(val);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx > drawerWidth / 3) {
          Animated.timing(animatedX, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(animatedX, {
            toValue: -drawerWidth,
            duration: 180,
            useNativeDriver: true,
          }).start(() => onClose());
        }
      },
    }),
  ).current;

  const drawerPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dx < -10 && Math.abs(g.dy) < 10,
      onPanResponderMove: (_, g) => {
        const val = Math.min(0, Math.max(-drawerWidth, g.dx));
        animatedX.setValue(val);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx < -drawerWidth / 3) {
          Animated.timing(animatedX, {
            toValue: -drawerWidth,
            duration: 180,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          Animated.timing(animatedX, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const renderListHeaderComponent = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderListEmptyComponent = () => {
    if (loading) {
      return null;
    }
    return <Text style={styles.emptyText}>{strings.no_sessions_yet}</Text>;
  };

  const renderItem = ({ item }: { item: SessionListItem }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.sessionItem,
          currentSessionId === item.id && styles.sessionItemActive,
        ]}
        onPress={() => onSelectSession(item.id)}
      >
        <Text style={styles.sessionTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {!open && (
        <View style={styles.edgeSwipeArea} {...edgePanResponder.panHandlers} />
      )}

      {open && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      <Animated.View
        style={[
          styles.drawer,
          { width: drawerWidth, transform: [{ translateX: animatedX }] },
        ]}
        {...drawerPanResponder.panHandlers}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerArea}>
            <Text style={styles.greeting} numberOfLines={1}>
              {`${strings.hello}, ${userName ?? strings.user_fallback}`}
            </Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={sessions}
              renderItem={renderItem}
              ListEmptyComponent={renderListEmptyComponent}
              ListHeaderComponent={renderListHeaderComponent}
            />
          </View>

          <Button
            text={strings.logout_title}
            onPress={() => onPressLogout?.()}
            allowVMargin
          />
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default SessionsDrawer;

const styles = StyleSheet.create({
  edgeSwipeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: wp(12),
    backgroundColor: colors.transparent,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.backdrop,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.background,
    borderTopRightRadius: wp(14),
    borderBottomRightRadius: wp(14),
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: wp(16),
  },
  headerArea: {
    paddingTop: hp(8),
    paddingBottom: hp(12),
  },
  greeting: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 18,
  },
  listContainer: {
    flex: 1,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(16),
  },
  emptyText: {
    color: colors.textPrimary,
    opacity: 0.7,
  },
  sessionItem: {
    paddingLeft: wp(8),
    paddingVertical: hp(10),
  },
  sessionItemActive: {
    backgroundColor: colors.secondary,
    borderRadius: wp(12),
  },
  sessionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  footerArea: {
    paddingVertical: hp(12),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(12),
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
