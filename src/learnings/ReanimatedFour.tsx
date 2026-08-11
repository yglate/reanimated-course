import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import type { CSSAnimationKeyframes } from 'react-native-reanimated';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { COLORS } from '../constants';

const ReanimatedFour = () => {
  const width = useSharedValue(100);
  const height = useSharedValue(100);

  const handlePress = useCallback(() => {
    width.value = withSpring(Math.random() * 100 + 50);
    height.value = withSpring(Math.random() * 100 + 50);
  }, [width, height]);

  console.log('ReanimatedFour rendered');

  const rotate: CSSAnimationKeyframes = {
    from: {
      transform: [{ rotateZ: '0deg' }],
    },
    to: {
      transform: [{ rotateZ: '360deg' }],
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        style={{
          width,
          height,
          backgroundColor: COLORS.BLUE,
          borderRadius: 20,
          marginBottom: 20,
          transitionProperty: ['width', 'height'],
          transitionDuration: '500ms',
        }}
      />
      <Button onPress={handlePress} title="Click me" />
      <Animated.View
        style={[
          {
            height,
            width,
            backgroundColor: COLORS.RED,
            borderRadius: 20,
            marginTop: 100,
            animationName: rotate,
            animationDuration: '2s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          },
        ]}
      />
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

export { ReanimatedFour };
