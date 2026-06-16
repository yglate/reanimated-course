import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants';
import { MagicButton } from '../components/MagicButton';

const SkiaMagicButton = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <MagicButton
        width={100}
        height={100}
        onPress={() => {
          console.log('Button Pressed...!');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SkiaMagicButton };
