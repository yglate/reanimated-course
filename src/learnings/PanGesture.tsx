import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { COLORS } from '../constants';
import { SQUARE_SIZE } from '../constants/constants';

const PanGesture = () => {
  // Position translation values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Context to store previous position for smooth dragging
  const context = useSharedValue({ x: 0, y: 0 });

  // State to track if the square is being dragged
  const isDragging = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Start dragging: save current position as context and set dragging state
      isDragging.value = true;
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(event => {
      // While dragging: add translation to context to get new position
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onFinalize(() => {
      // Stop dragging when gesture ends: reset dragging state
      isDragging.value = false;
    });

  // Derived: rotate 45deg while dragging (with spring)
  const rotate = useDerivedValue(() => {
    return withSpring(isDragging.value ? '45deg' : '0deg');
  }, []);

  // Derived: scale down while dragging (with spring)
  const scale = useDerivedValue(() => {
    return withSpring(isDragging.value ? 0.9 : 1);
  }, []);

  // Derived: color based on isDragging and position
  const color = useDerivedValue(() => {
    if (isDragging.value) {
      return COLORS.BLUE;
    }
    const isInTheWhitespace = translateY.value < 0;
    const isInTheBlackSpace = translateY.value > 0;

    if (isInTheWhitespace) {
      return COLORS.BLACK;
    }
    if (isInTheBlackSpace) {
      return COLORS.WHITE;
    }
    return COLORS.BLUE;
  }, []);

  // Derived: animate color changes smoothly with timing in one place to avoid repetition
  const animatedColor = useDerivedValue(() => {
    return withTiming(color.value);
  }, []);

  // Combine all values into animated style
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedColor.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: rotate.value },
      ],
    };
  });

  // Reset the square to its original position with a spring animation
  const resetSquarePosition = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.square, reanimatedStyle]} />
      </GestureDetector>
      <View style={styles.background} />
      <TouchableOpacity style={styles.button} onPress={resetSquarePosition}>
        <Text style={styles.buttonText}>Reset{'\n'}Position</Text>
      </TouchableOpacity>
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
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: COLORS.BLUE,
    borderRadius: 30,
    borderCurve: 'continuous',
    zIndex: 2,
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: COLORS.BLACK,
    zIndex: 1,
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: COLORS.WHITE,
    borderRadius: 32,
    position: 'absolute',
    bottom: 48,
    right: 20,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});

export { PanGesture };
