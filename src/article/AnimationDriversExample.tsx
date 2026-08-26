import React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, DURATION } from '../constants';

const BOX_SIZE = 90;
const CARD_PADDING = 16;

export const AnimationDriversExample = () => {
  // 1. withTiming State
  const opacity = useSharedValue(1);

  const timingStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleToggleTiming = () => {
    opacity.value = withTiming(opacity.value === 0 ? 1 : 0, {
      duration: DURATION.MS_500,
      easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
    });
  };

  // 2. withSpring State (Scale & Rotation)
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const springConfig = {
    damping: 12,
    stiffness: 140,
    mass: 1,
  };

  const springStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${rotation.value}deg` }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(1.25, springConfig);
    rotation.value = withSpring(360, springConfig); // Rotates 360deg on press
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
    rotation.value = withSpring(0, springConfig); // Springs back to 0deg
  };

  // 3. withDecay State
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const maxTranslateX = useSharedValue(100);

  const handleCardLayout = (event: LayoutChangeEvent) => {
    const cardWidth = event.nativeEvent.layout.width;
    const maxBound = (cardWidth - 2 * CARD_PADDING - BOX_SIZE) / 2;
    maxTranslateX.value = Math.max(0, maxBound);
  };

  const decayPan = Gesture.Pan()
    .onStart(() => {
      cancelAnimation(translateX);
      startX.value = translateX.value;
    })
    .onUpdate(event => {
      const rawX = startX.value + event.translationX;
      translateX.value = Math.min(
        Math.max(rawX, -maxTranslateX.value),
        maxTranslateX.value,
      );
    })
    .onEnd(event => {
      translateX.value = withDecay(
        {
          velocity: event.velocityX,
          clamp: [-maxTranslateX.value, maxTranslateX.value],
          deceleration: 0.998,
        },
        isFinished => {
          if (isFinished) {
            translateX.value = withSpring(0, {
              damping: 14,
              stiffness: 120,
            });
          }
        },
      );
    });

  const decayStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. withTiming Card */}
      <View style={styles.card}>
        <Text style={styles.title}>1. withTiming (Duration & Easing)</Text>
        <Animated.View style={[styles.box, styles.blueBox, timingStyle]} />
        <Button title="Toggle Fade" onPress={handleToggleTiming} />
      </View>

      {/* 2. withSpring Card */}
      <View style={styles.card}>
        <Text style={styles.title}>2. withSpring (Scale & Rotate)</Text>
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.box, styles.greenBox, springStyle]}>
            <Text style={styles.boxText}>Press Me</Text>
          </Animated.View>
        </Pressable>
      </View>

      {/* 3. withDecay Card */}
      <View style={styles.card} onLayout={handleCardLayout}>
        <Text style={styles.title}>3. withDecay (Inertia & Friction)</Text>
        <GestureDetector gesture={decayPan}>
          <Animated.View style={[styles.box, styles.orangeBox, decayStyle]}>
            <Text style={styles.boxText}>Swipe / Fling</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: CARD_PADDING,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 20,
    gap: 16,
    overflow: 'hidden',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TITLE_GREY,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueBox: {
    backgroundColor: COLORS.BLUE,
  },
  greenBox: {
    backgroundColor: COLORS.GREEN,
  },
  orangeBox: {
    backgroundColor: COLORS.ORANGE,
  },
  boxText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
});
