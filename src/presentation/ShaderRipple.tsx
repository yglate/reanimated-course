/* eslint-disable camelcase */
import { Canvas, Fill, Shader } from '@shopify/react-native-skia';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { DURATION, shaderWaterRipple } from '../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function ShaderRippleDemo() {
  const touch = useSharedValue({
    x: SCREEN_WIDTH / 2,
    y: SCREEN_HEIGHT / 2,
  });
  const time = useSharedValue(0);
  const intensity = useSharedValue(0);

  React.useEffect(() => {
    // Continuous time ticker for wave propagation
    time.value = withRepeat(
      withTiming(100, { duration: DURATION.MS_40000, easing: Easing.linear }),
      -1,
    );
  }, [time]);

  // Track finger drag and dynamically adjust ripple intensity
  const gesture = Gesture.Pan()
    .onBegin(e => {
      touch.value = { x: e.x, y: e.y };
      intensity.value = withTiming(1, { duration: 150 });
    })
    .onUpdate(e => {
      touch.value = { x: e.x, y: e.y };
      if (intensity.value < 0.95) {
        intensity.value = 1;
      }
    })
    .onEnd(() => {
      // Gently fade out the ripple back to a calm surface
      intensity.value = withTiming(0, {
        duration: 650,
        easing: Easing.out(Easing.quad),
      });
    });

  const uniforms = useDerivedValue(() => ({
    u_touch: [touch.value.x, touch.value.y],
    u_time: time.value,
    u_resolution: [SCREEN_WIDTH, SCREEN_HEIGHT],
    u_intensity: intensity.value,
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas style={styles.canvas}>
          <Fill>
            <Shader source={shaderWaterRipple} uniforms={uniforms} />
          </Fill>
        </Canvas>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04345c',
  },
  canvas: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
