import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from '../constants';

const ExampleComponent = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Start Working Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ExampleComponent };
