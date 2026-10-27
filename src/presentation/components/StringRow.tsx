import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { StringConfig } from '../../types';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';

const { width } = Dimensions.get('window');

export const StringRow = ({ config }: Readonly<{ config: StringConfig }>) => {
  const centerY = 60;
  const controlY = useSharedValue(centerY);
  const controlX = useSharedValue(width / 2);

  const gesture = Gesture.Pan()
    .onBegin(e => {
      controlX.value = e.x;
      controlY.value = e.y;
    })
    .onUpdate(e => {
      controlX.value = e.x;
      const deltaY = e.y - centerY;
      // Generous clamp allowing authentic displacement
      controlY.value = centerY + Math.max(-75, Math.min(75, deltaY));
    })
    .onEnd(() => {
      controlY.value = withSpring(centerY, config.springConfig);
      controlX.value = withSpring(width / 2, { damping: 14, stiffness: 160 });
    });

  const animatedPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    path.moveTo(20, centerY);
    path.quadTo(controlX.value, controlY.value, width - 20, centerY);
    return path;
  });
  return (
    <View style={styles.row}>
      <View style={styles.rowHeader}>
        <Text style={[styles.rowName, { color: config.color }]}>
          {config.name}
        </Text>
        <Text style={styles.rowSpec}>{config.spec}</Text>
      </View>

      <GestureDetector gesture={gesture}>
        <View style={styles.canvasContainer}>
          <Canvas style={styles.canvas}>
            <Path
              path={animatedPath}
              color={config.color}
              style="stroke"
              strokeWidth={config.strokeWidth}
              strokeCap="round"
            />
          </Canvas>
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    marginHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f1f5f9',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  rowName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  rowSpec: {
    fontSize: 13,
    color: '#94a3b8',
    fontVariant: ['tabular-nums'],
  },
  canvasContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
  },
  canvas: {
    flex: 1,
  },
});
