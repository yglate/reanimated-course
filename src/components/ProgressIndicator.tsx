import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReText } from 'react-native-redash';
import { AntDesign } from '@expo/vector-icons';

import { COLORS } from '../constants';
import { useSharedProgressState } from '../hooks/useSharedProgressState';

interface ProgressIndicatorProps {
  readingTime: number;
  progress: SharedValue<number>;
  onReset: () => void;
}

const ProgressIndicator = ({
  readingTime,
  progress,
  onReset,
}: ProgressIndicatorProps) => {
  const {
    progressState,
    reanimatedInitialViewStyle,
    reanimatedScrollingViewStyle,
    reanimatedCompletedViewStyle,
  } = useSharedProgressState(progress);

  // Animate the width of the content container based on the progress state
  const reanimatedContentStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(progressState.value === 'scrolling' ? 200 : 80),
    };
  }, []);

  // Animate the width of the progress bar based on the progress value
  const reanimatedExpandedProgressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  }, []);

  // Calculate the progress percentage as a string to display in the UI
  const progressPercentage = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, reanimatedContentStyle]}>
        {/* Initial State : Showing Reading Time */}
        <Animated.View style={reanimatedInitialViewStyle}>
          <Text style={styles.readingTimeText}>{readingTime} min</Text>
        </Animated.View>

        {/* Completed State : Showing Arrow Up Button To Scroll To Top */}
        <Animated.View
          style={[styles.completedContainer, reanimatedCompletedViewStyle]}
          onTouchEnd={onReset}>
          <AntDesign name="arrow-up" size={32} color={COLORS.LIGHT_GREY} />
        </Animated.View>

        {/* Scrolling State : Showing Progress Percentage */}
        <Animated.View
          style={[styles.expandedContainer, reanimatedScrollingViewStyle]}>
          {/* Scrolling State : Showing Progress Percentage */}
          <ReText text={progressPercentage} style={styles.progressText} />
          <View style={styles.progressIndicatorContainer}>
            <Animated.View
              style={[styles.progressBar, reanimatedExpandedProgressBarStyle]}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export { ProgressIndicator };

const styles = StyleSheet.create({
  container: {
    height: 80,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '100%',
    borderRadius: 45,
    borderWidth: 5,
    borderColor: COLORS.DARK_GREY,
    backgroundColor: COLORS.MEDIUM_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  readingTimeText: {
    fontSize: 16,
    color: COLORS.LIGHT_GREY,
  },
  expandedContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  progressText: {
    color: COLORS.PROGRESS_INDICATOR_ACTIVE,
    fontSize: 17,
    marginRight: 12,
  },
  progressIndicatorContainer: {
    width: 100,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.PROGRESS_INDICATOR_INACTIVE,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
  },
  completedContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});
