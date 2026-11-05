import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
  usePanGesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { COLORS } from '../constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const THRESHOLD = 150;
const TRACK_HEIGHT = 240;
const HANDLE_SIZE = 40;

const AnimationAnimatedReactionVsUseEffect = () => {
  const [activeHook, setActiveHook] = useState<
    'useAnimatedReaction' | 'useEffect'
  >('useAnimatedReaction');
  const [hapticCount, setHapticCount] = useState<number>(0);

  const scrollOffset = useSharedValue(0);
  const contextY = useSharedValue(0);

  const triggerHapticFeedback = () => {
    setHapticCount(prev => prev + 1);
  };

  useAnimatedReaction(
    () => {
      return scrollOffset.value;
    },
    (current, previous) => {
      if (activeHook === 'useAnimatedReaction') {
        if (
          current > THRESHOLD &&
          (previous === null || previous <= THRESHOLD)
        ) {
          scheduleOnRN(triggerHapticFeedback);
        }
      }
    },
  );

  const simulateUseEffectTracking = (value: number) => {
    if (activeHook === 'useEffect' && value > THRESHOLD) {
      // Fires repeatedly or late due to asynchronous bridge scheduling
      triggerHapticFeedback();
    }
  };

  const panGesture = usePanGesture({
    onActivate: () => {
      'worklet';
      contextY.value = scrollOffset.value;
    },
    onUpdate: event => {
      'worklet';
      const nextY = Math.max(
        0,
        Math.min(
          TRACK_HEIGHT - HANDLE_SIZE,
          contextY.value + event.translationY,
        ),
      );
      scrollOffset.value = nextY;

      if (activeHook === 'useEffect') {
        scheduleOnRN(simulateUseEffectTracking, nextY);
      }
    },
  });

  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollOffset.value }],
      backgroundColor: scrollOffset.value > THRESHOLD ? COLORS.BLUE : '#475569',
    };
  });

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      height: scrollOffset.value,
    };
  });

  const resetCanvas = (hookType: 'useAnimatedReaction' | 'useEffect') => {
    setActiveHook(hookType);
    setHapticCount(0);
    scrollOffset.value = withSpring(0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Event Architecture</Text>
          <Text style={styles.headerSubtitle}>60 FPS THRESHOLD REFINED</Text>
        </View>

        <View style={styles.tabsContainer}>
          <Pressable
            onPress={() => resetCanvas('useAnimatedReaction')}
            style={[
              styles.tabButton,
              activeHook === 'useAnimatedReaction' && styles.activeTabButton,
            ]}>
            <Text
              style={[
                styles.tabButtonText,
                activeHook === 'useAnimatedReaction' &&
                  styles.activeTabButtonText,
              ]}>
              useAnimatedReaction
            </Text>
          </Pressable>
          <Pressable
            onPress={() => resetCanvas('useEffect')}
            style={[
              styles.tabButton,
              activeHook === 'useEffect' && styles.activeTabButton,
            ]}>
            <Text
              style={[
                styles.tabButtonText,
                activeHook === 'useEffect' && styles.activeTabButtonText,
              ]}>
              useEffect
            </Text>
          </Pressable>
        </View>

        <View style={styles.sandboxCanvas}>
          <Text style={styles.instructionText}>
            Drag handle downward over the line marker
          </Text>

          <View style={styles.sliderTrackContainer}>
            <View style={[styles.thresholdMarkerLine, { top: THRESHOLD }]} />
            <Text style={[styles.thresholdMarkerText, { top: THRESHOLD }]}>
              THRESHOLD TARGET ({THRESHOLD}px)
            </Text>

            <Animated.View style={[styles.activeFillLine, animatedLineStyle]} />

            <GestureDetector gesture={panGesture}>
              <Animated.View
                style={[styles.sliderHandle, animatedHandleStyle]}
              />
            </GestureDetector>
          </View>

          <View style={styles.counterRow}>
            <Text style={styles.counterLabel}>Action Triggers Sent: </Text>
            <Text
              style={[
                styles.counterValue,
                { color: hapticCount > 0 ? COLORS.BLUE : '#94a3b8' },
              ]}>
              {hapticCount}
            </Text>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1120',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 15,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#202b3d',
    borderWidth: 1,
    borderColor: '#263247',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#cbd5e1',
  },
  activeTabButtonText: {
    color: COLORS.WHITE,
  },
  sandboxCanvas: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#141c2b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#263247',
    alignItems: 'center',
    paddingVertical: 15,
  },
  instructionText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 15,
  },
  sliderTrackContainer: {
    width: HANDLE_SIZE,
    height: TRACK_HEIGHT,
    backgroundColor: '#263247',
    borderRadius: HANDLE_SIZE / 2,
    position: 'relative',
  },
  activeFillLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1e40af',
    borderRadius: HANDLE_SIZE / 2,
  },
  sliderHandle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    position: 'absolute',
    top: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  thresholdMarkerLine: {
    position: 'absolute',
    left: -(SCREEN_WIDTH / 3),
    right: -(SCREEN_WIDTH / 3),
    height: 2,
    backgroundColor: '#ef4444',
    borderStyle: 'dashed',
  },
  thresholdMarkerText: {
    position: 'absolute',
    left: -(SCREEN_WIDTH / 3),
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ef4444',
    marginTop: 20,
    width: SCREEN_WIDTH / 3,
  },
  counterRow: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export { AnimationAnimatedReactionVsUseEffect };
