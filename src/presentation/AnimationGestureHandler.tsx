import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDecay,
} from 'react-native-reanimated';

import { COLORS, DURATION, gestureData } from '../constants';

const SquareSize = 150;
const SCREEN_WIDTH = Dimensions.get('window').width;

const AnimationGestureHandler = () => {
  const [activeTab, setActiveTab] = useState<string>('tap');

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.85);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = contextX.value + event.translationX;
      translateY.value = contextY.value + event.translationY;
    })
    .onEnd(event => {
      translateX.value = withDecay({ velocity: event.velocityX });
      translateY.value = withDecay({ velocity: event.velocityY });
    });

  // --- Simultaneous Mechanics: Tap (Scale Increase) + Pan ---
  const simultaneousTap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(1.3);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
    });

  const simultaneousPan = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = contextX.value + event.translationX;
      translateY.value = contextY.value + event.translationY;
    });

  // Combine Tap and Pan to execute concurrently in one fluid interaction
  const simultaneousGestures = Gesture.Simultaneous(
    simultaneousTap,
    simultaneousPan,
  );

  const longPressGesture = Gesture.LongPress()
    .minDuration(DURATION.MS_500)
    .onStart(() => {
      scale.value = withSpring(1.3);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
    });

  const resetCanvasPositions = (tabId: string) => {
    setActiveTab(tabId);
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    rotation.value = withSpring(0);
  };

  const getActiveGesture = () => {
    switch (activeTab) {
      case 'tap':
        return tapGesture;
      case 'pan':
        return panGesture;
      case 'simultaneous':
        return simultaneousGestures;
      case 'longpress':
        return longPressGesture;
      default:
        return tapGesture;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}rad` },
      ],
    };
  });

  const selectedGestureInfo = gestureData.find(g => g.id === activeTab)!;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Direct Touch Manipulation</Text>
          <Text style={styles.headerSubtitle}>
            GESTURE ARCHITECTURE COMPARISON
          </Text>
        </View>

        <View style={styles.tabsContainer}>
          {gestureData.map(item => (
            <Pressable
              key={item.id}
              onPress={() => resetCanvasPositions(item.id)}
              style={[
                styles.tabButton,
                activeTab === item.id && styles.activeTabButton,
              ]}>
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === item.id && styles.activeTabButtonText,
                ]}>
                {item.name.replace('Gesture.', '')}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sandboxCanvas}>
          <GestureDetector gesture={getActiveGesture()}>
            <Animated.View style={[styles.square, animatedStyle]} />
          </GestureDetector>
        </View>

        <View style={styles.infoCard}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}>
            <Text style={styles.infoName}>{selectedGestureInfo.name}</Text>

            <Text style={styles.sectionHeading}>BEHAVIOR</Text>
            <Text style={styles.descriptionText}>
              {selectedGestureInfo.description}
            </Text>

            <Text style={styles.sectionHeading}>REAL-WORLD EXAMPLE</Text>
            <Text style={styles.exampleText}>
              {selectedGestureInfo.example}
            </Text>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
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
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: (SCREEN_WIDTH - 50) / 4,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  activeTabButtonText: {
    color: COLORS.WHITE,
  },
  sandboxCanvas: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  square: {
    width: SquareSize,
    height: SquareSize,
    backgroundColor: COLORS.BLUE,
    borderRadius: 30,
    borderCurve: 'continuous',
  },
  infoCard: {
    height: 200,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  infoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontFamily: 'Courier New',
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 13,
    color: '#e2e8f0',
    lineHeight: 18,
  },
  exampleText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

export { AnimationGestureHandler };
