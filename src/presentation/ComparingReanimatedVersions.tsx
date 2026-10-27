import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const TRAVEL_DISTANCE = CARD_WIDTH - 32 - 48 - 12;

export const ComparingReanimatedVersions = () => {
  const [active, setActive] = useState(false);

  // Approach 1: Classic Hook Pattern (v2/v3)
  const offset = useSharedValue(0);

  const classicAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const handleToggle = () => {
    const nextState = !active;
    setActive(nextState);

    offset.value = withTiming(nextState ? TRAVEL_DISTANCE : 0, {
      duration: 300,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Evolution in Action</Text>
          <Text style={styles.subtitle}>
            Comparing boilerplate: Imperative hooks vs. Declarative motion
          </Text>
        </View>

        <Pressable
          onPress={handleToggle}
          style={({ pressed }) => [
            styles.toggleButton,
            active && styles.toggleButtonActive,
            pressed && { opacity: 0.85 },
          ]}>
          <Text style={styles.toggleButtonText}>
            {active ? 'Reset Position (0)' : 'Trigger Motion (active → true)'}
          </Text>
        </Pressable>

        {/* 1. Classic Hook Pattern (v2/v3) Output */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Classic Hook Pattern (v2/v3)</Text>
              <Text style={styles.cardSub}>
                useSharedValue + useAnimatedStyle + withTiming
              </Text>
            </View>
          </View>

          <View style={styles.track}>
            <Animated.View
              style={[styles.box, styles.boxClassic, classicAnimatedStyle]}>
              <Text style={styles.boxText}>v3</Text>
            </Animated.View>
          </View>
        </View>

        {/* 2. Declarative Transitions (v4) Output */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Declarative Transitions (v4)</Text>
              <Text style={styles.cardSub}>
                Pure declarative inline transition & layout
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.track,
              { alignItems: active ? 'flex-end' : 'flex-start' },
            ]}>
            <Animated.View
              layout={LinearTransition.duration(300)}
              style={[styles.box, styles.boxDeclarative]}>
              <Text style={styles.boxText}>v4</Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 4,
    lineHeight: 18,
  },
  toggleButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#0284c7',
  },
  toggleButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  cardSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  track: {
    height: 56,
    backgroundColor: '#e2e8ee',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxClassic: {
    backgroundColor: '#3b82f6',
  },
  boxDeclarative: {
    backgroundColor: '#8b5cf6',
  },
  boxText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
});
