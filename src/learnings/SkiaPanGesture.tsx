import {
  BlurMask,
  Group,
  rect,
  Rect,
  RoundedRect,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Touchable, { useGestureHandler } from 'react-native-skia-gesture';

import { COLORS, ScreenHeight, ScreenWidth, SQUARE_SIZE } from '../constants';

const SkiaPanGesture = () => {
  const translateX = useSharedValue(ScreenWidth / 2 - SQUARE_SIZE / 2);
  const translateY = useSharedValue(ScreenHeight / 2 - SQUARE_SIZE / 2);

  const previousTranslateValues = useSharedValue({ x: 0, y: 0 });
  const isDragging = useSharedValue(false);

  const panGesture = useGestureHandler({
    onStart: () => {
      'worklet';
      isDragging.value = true;
      previousTranslateValues.value = {
        x: translateX.value,
        y: translateY.value,
      };
    },
    onActive: ({ translationX, translationY }) => {
      'worklet';
      translateX.value = translationX + previousTranslateValues.value.x;
      translateY.value = translationY + previousTranslateValues.value.y;
    },
    onEnd: () => {
      'worklet';
      isDragging.value = false;
    },
  });

  const scale = useDerivedValue(() => {
    return withSpring(isDragging.value ? 1.2 : 1);
  }, []);

  const rotate = useDerivedValue(() => {
    return withSpring(isDragging.value ? Math.PI / 4 : 0);
  }, []);

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: rotate.value,
      },
      {
        scale: scale.value,
      },
    ];
  }, []);

  const origin = useDerivedValue(() => {
    return {
      x: translateX.value + SQUARE_SIZE / 2,
      y: translateY.value + SQUARE_SIZE / 2,
    };
  }, []);

  const whiteRect = rect(0, 0, ScreenWidth, ScreenHeight / 2);
  const blackRect = rect(0, ScreenHeight / 2, ScreenWidth, ScreenHeight / 2);

  const blur = useDerivedValue(() => {
    return withTiming(isDragging.value ? 20 : 0);
  }, []);

  return (
    <Touchable.Canvas style={styles.container}>
      <Rect
        // x={0}
        // y={0}
        // width={ScreenWidth}
        // height={ScreenHeight / 2}
        // Equivalent to the above commented code
        rect={whiteRect}
        color={COLORS.WHITE}
      />
      <Rect rect={blackRect} color={COLORS.BLACK} />
      <Group>
        <Group clip={whiteRect}>
          <Group transform={transform} origin={origin}>
            <Touchable.RoundedRect
              x={translateX}
              y={translateY}
              width={SQUARE_SIZE}
              height={SQUARE_SIZE}
              r={30}
              color={COLORS.BLACK}
              {...panGesture}
            />
          </Group>
        </Group>
        <Group clip={whiteRect} invertClip>
          <Group transform={transform} origin={origin}>
            <RoundedRect
              x={translateX}
              y={translateY}
              width={SQUARE_SIZE}
              height={SQUARE_SIZE}
              r={30}
              color={COLORS.WHITE}
              {...panGesture}
            />
          </Group>
        </Group>
        <BlurMask blur={blur} style={'solid'} />
      </Group>
    </Touchable.Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { SkiaPanGesture };
