import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

import { colors } from '../../helper';
import { LoaderProps } from '../../declarations';

const Loader = ({ visible = false }: LoaderProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
