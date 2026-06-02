import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { COLORS, DURATION } from '../constants';
import { generateRandomColor } from '../helper';

const LayoutTransitions = () => {
  const [ids, setIds] = useState<string[]>([]);

  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        setIds(prev => [generateRandomColor(), ...prev]);
      }}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.listContainer}>
        {ids.map(colorId => (
          <Animated.View
            layout={LinearTransition.springify()}
            entering={FadeIn.duration(DURATION.MS_250)}
            exiting={FadeOut.duration(DURATION.MS_250)}
            key={colorId}
            style={[styles.listItem, { backgroundColor: colorId }]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listItem: {
    height: 90,
    width: '95%',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  listContainer: {
    paddingTop: 70,
  },
});

export { LayoutTransitions };
