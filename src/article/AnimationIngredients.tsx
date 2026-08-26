import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { COLORS } from '../constants';

const SquareSize = 120;

const AnimationIngredients = () => {
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        onTouchStart={() => (scale.value = withSpring(1.2))}
        onTouchEnd={() => (scale.value = withSpring(1))}
        style={[styles.square, rStyle]}
      />
      <Text style={styles.text}>Touch above square to see effect</Text>
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
    width: SquareSize,
    height: SquareSize,
    backgroundColor: COLORS.BLUE,
    borderRadius: 30,
    borderCurve: 'continuous', // Only for iOS
    marginBottom: 50,
  },
  text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export { AnimationIngredients };
