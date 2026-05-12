import { StyleSheet } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { COLORS, DURATION } from '../constants';
import { CIRCLE_RADIUS } from '../constants/constants';

const SpatialTapGesture = () => {
  // Current tap position
  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const scale = useSharedValue(0);

  // Previous tap position
  const previousLeft = useSharedValue(0);
  const previousTop = useSharedValue(0);

  const tapGesture = Gesture.Tap().onBegin(event => {
    // Save previous before updating current
    previousLeft.value = left.value;
    previousTop.value = top.value;
    left.value = event.x;
    top.value = event.y;
  });

  // Current circle style (with scale animation)
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      left: left.value - CIRCLE_RADIUS,
      top: top.value - CIRCLE_RADIUS,
      transform: [{ scale: scale.value }],
    };
  }, []);

  // Previous circle style
  const reanimatedPreviousStyle = useAnimatedStyle(() => {
    return {
      left: previousLeft.value - CIRCLE_RADIUS,
      top: previousTop.value - CIRCLE_RADIUS,
    };
  }, []);

  // Trigger scale animation when position changes
  useAnimatedReaction(
    () => {
      return left.value;
    },
    (current, previous) => {
      if (current !== previous && current !== 0) {
        cancelAnimation(scale);
        scale.value = 0;
        scale.value = withSpring(1, { mass: 0.5 });
      }
    },
  );

  // Animated position for magic circle
  const animatedLeft = useDerivedValue(() => {
    return withTiming(left.value, {
      duration: DURATION.MS_1000,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  const animatedTop = useDerivedValue(() => {
    return withTiming(top.value, {
      duration: DURATION.MS_1000,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  // Magic circle style
  const reanimatedMagicCircleStyle = useAnimatedStyle(() => {
    return {
      left: animatedLeft.value - CIRCLE_RADIUS,
      top: animatedTop.value - CIRCLE_RADIUS,
    };
  }, []);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={styles.container}>
        <StatusBar style="light" />
        <Animated.View style={[styles.baseCircle, reanimatedStyle]} />
        <Animated.View style={[styles.baseCircle, reanimatedPreviousStyle]} />
        <Animated.View
          style={[
            styles.baseCircle,
            styles.magicCircle,
            reanimatedMagicCircleStyle,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  baseCircle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: COLORS.GREY,
    position: 'absolute',
  },
  magicCircle: {
    backgroundColor: COLORS.BLUE,
  },
});

export { SpatialTapGesture };
