import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ZigzagChart } from './components/ZigZagChart';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

export const SkiaVectorScreen = () => {
  // Upward zigzag points
  const upwardPoints = [
    { x: 12, y: 135 },
    { x: 55, y: 95 },
    { x: 105, y: 115 },
    { x: 165, y: 72 },
    { x: 215, y: 90 },
    { x: 265, y: 38 },
    { x: CARD_WIDTH - 24, y: 20 },
  ];

  // Downward zigzag points
  const downwardPoints = [
    { x: 12, y: 20 },
    { x: 55, y: 60 },
    { x: 105, y: 40 },
    { x: 165, y: 83 },
    { x: 215, y: 65 },
    { x: 265, y: 117 },
    { x: CARD_WIDTH - 24, y: 135 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Text style={styles.title}>Charts using Skia</Text>
          <Text style={styles.subtitle}>
            Fluid 60 FPS vector paths rendered directly on the GPU
          </Text>
        </View>

        <ZigzagChart
          points={upwardPoints}
          title="Upward Momentum"
          subtitle="Sharp zigzag progression • +42.6%"
          color="#0284c7"
        />
        <ZigzagChart
          points={downwardPoints}
          title="Downward Momentum"
          subtitle="Gradual cool-off trajectory • -38.4%"
          color="#e11d48"
        />
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
  pageHeader: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    lineHeight: 20,
  },
});
