import { Canvas, Circle, Path } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { COLORS, DURATION } from '../constants';
import { useDrawGesture } from '../hooks/useDrawGesture';
import { PathPoint } from '../types';
import { getPathPoints } from '../helper/getPathPoints';

const AnimateThroughPath = () => {
  const points = useSharedValue<PathPoint[]>([]);

  const progress = useSharedValue(0);

  const { panGesture, skiaPath, pathOpacity } = useDrawGesture({
    onComplete: computedPath => {
      points.value = getPathPoints(computedPath);
      cancelAnimation(progress);
      progress.value = 0;
      progress.value = withTiming(1, { duration: DURATION.MS_1500 });
    },
  });

  const circleX = useDerivedValue(() => {
    if (!points.value.length) return 0;
    const inputRange = points.value.map(
      (_, index) => index / points.value.length,
    );
    const pointsX = points.value.map(point => point.x);

    return interpolate(progress.value, inputRange, pointsX);
  }, [points]);

  const circleY = useDerivedValue(() => {
    if (!points.value.length) return 0;
    const inputRange = points.value.map(
      (_, index) => index / points.value.length,
    );
    const pointsY = points.value.map(point => point.y);
    return interpolate(progress.value, inputRange, pointsY);
  }, [points]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GestureDetector gesture={panGesture}>
        <Canvas style={styles.pathCanvas}>
          <Path
            path={skiaPath}
            color={COLORS.WHITE}
            style="stroke"
            strokeWidth={2}
            opacity={pathOpacity}
          />
          <Circle cx={circleX} cy={circleY} r={10} color={COLORS.WHITE} />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  pathCanvas: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
});

export { AnimateThroughPath };
