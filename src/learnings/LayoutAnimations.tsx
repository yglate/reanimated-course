import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  FlipInEasyX,
  FlipOutEasyX,
  Keyframe,
} from 'react-native-reanimated';

import { COLORS } from '../constants';

const CustomFlipIn = new Keyframe({
  from: {
    opacity: 0,
    transform: [{ perspective: 500 }, { rotateX: '90deg' }],
  },
  to: {
    opacity: 1,
    transform: [{ perspective: 500 }, { rotateX: '0deg' }],
  },
});

const CustomFlipOut = new Keyframe({
  from: {
    opacity: 1,
    transform: [{ perspective: 500 }, { rotateX: '0deg' }],
  },
  to: {
    opacity: 0,
    transform: [{ perspective: 500 }, { rotateX: '-90deg' }],
  },
});

const LayoutAnimations = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        console.log('Pressed');
        setIsVisible(prev => !prev);
      }}>
      <StatusBar style="auto" />
      {/* Built In Entering and Exiting Animations */}
      {isVisible && (
        <Animated.View
          entering={FlipInEasyX.duration(500)}
          exiting={FlipOutEasyX.duration(500)}
          style={{
            height: 200,
            width: '80%',
            backgroundColor: COLORS.RED,
            borderRadius: 20,
            borderCurve: 'continuous',
            marginBottom: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>
            Built In Layout Animation {'\n'} (Using FlipInEasyX and
            FlipOutEasyX)
          </Text>
        </Animated.View>
      )}
      {/* Custom Entering and Exiting Animations */}
      {isVisible && (
        <Animated.View
          entering={CustomFlipIn.duration(500)}
          exiting={CustomFlipOut.duration(500)}
          style={{
            height: 200,
            width: '80%',
            backgroundColor: COLORS.BLUE,
            borderRadius: 20,
            borderCurve: 'continuous',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>
            Custom Layout Animation {'\n'} (Using Keyframes)
          </Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { LayoutAnimations };
