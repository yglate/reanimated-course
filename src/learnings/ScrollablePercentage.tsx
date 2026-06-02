import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  clamp,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { ProgressIndicator } from '../components/ProgressIndicator';
import { COLORS } from '../constants';
import { SECTIONS } from '../constants/constants';
import { getReadingTime } from '../helper';

const ScrollablePercentage = () => {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const progress = useSharedValue(0);
  const scrollHeight = useSharedValue(0);

  // Update the progress value based on the scroll position
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      progress.value = clamp(
        event.contentOffset.y / (event.contentSize.height - scrollHeight.value),
        0,
        1,
      );
    },
  });

  // Reset scroll position to the top when the user taps the reset button
  const onReset = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // Calculate reading time based on the content of the sections
  const calculateReadingTime = useCallback(() => {
    return getReadingTime(
      SECTIONS.map(({ title, description }) => `${title} ${description}`).join(
        ' ',
      ),
    );
  }, []);

  // Calculate the height of the scrollable content to determine the scroll progress
  const calculateScrollHeight = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      scrollHeight.value = nativeEvent.layout.height;
    },
    [scrollHeight],
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.ScrollView
        ref={scrollViewRef}
        onLayout={calculateScrollHeight}
        scrollEventThrottle={16} // 1 frame per 16ms = 60fps 1/60 = 16ms
        contentContainerStyle={styles.scrollableView}
        onScroll={onScroll}>
        {SECTIONS.map(({ title, description }, key) => (
          <View key={key} style={styles.section}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <ProgressIndicator
        readingTime={calculateReadingTime()}
        progress={progress}
        onReset={onReset}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  section: {
    marginBottom: 20,
  },
  scrollableView: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 160,
  },
  titleText: {
    color: COLORS.WHITE,
    fontSize: 25,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: COLORS.LIGHT_GREY,
    fontSize: 18,
    marginTop: 8,
  },
});

export { ScrollablePercentage };
