import {
  BlurMask,
  Canvas,
  Group,
  RoundedRect,
  SweepGradient,
} from '@shopify/react-native-skia';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { COLORS, DURATION } from '../constants';

interface MagicButtonProps {
  width: number;
  height: number;
  onPress?: () => void;
}

const MagicButton = ({ height, width, onPress }: MagicButtonProps) => {
  const internalPadding = 10;

  const externalPadding = 200;

  const realWidth = width + externalPadding;
  const realHeight = height + externalPadding;

  const realX = externalPadding / 2;
  const realY = externalPadding / 2;

  const center = { x: width / 2 + realX, y: height / 2 + realY };

  const isTouched = useSharedValue(false);

  const tapGesture = Gesture.Tap()
    .maxDuration(DURATION.MS_10000)
    .onBegin(() => {
      console.log('tapGesture onBegin');
      isTouched.value = true;
    })
    .onTouchesUp(() => {
      if (onPress) {
        scheduleOnRN(onPress);
      }
    })
    .onFinalize(() => {
      console.log('tapGesture onFinalize');
      isTouched.value = false;
    });

  const scale = useDerivedValue(() => {
    return withSpring(isTouched.value ? 1.2 : 1);
  }, []);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const rotate = useDerivedValue(() => {
    return withTiming(isTouched.value ? Math.PI * 2 : 0, {
      duration: DURATION.MS_1000,
    });
  }, []);

  const blur = useDerivedValue(() => {
    return withTiming(isTouched.value ? 40 : 0, { duration: DURATION.MS_1000 });
  }, []);

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: rotate.value,
      },
    ];
  }, []);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={reanimatedStyle}>
        <Canvas
          style={{
            height: realHeight,
            width: realWidth,
            backgroundColor: COLORS.BLACK,
          }}>
          <Group origin={center} transform={transform}>
            <RoundedRect
              x={realX}
              y={realY}
              width={width}
              height={height}
              color={COLORS.RED}
              r={width / 2}>
              <SweepGradient
                c={center}
                colors={['cyan', 'magenta', 'yellow', 'cyan']}
              />
              <BlurMask blur={blur} style="solid" />
            </RoundedRect>
          </Group>
          <RoundedRect
            x={internalPadding / 2 + realX}
            y={internalPadding / 2 + realY}
            width={width - internalPadding}
            height={height - internalPadding}
            color={COLORS.BLACK}
            r={width / 2}
          />
        </Canvas>
      </Animated.View>
    </GestureDetector>
  );
};

export { MagicButton };
