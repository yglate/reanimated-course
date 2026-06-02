import type { SharedValue } from 'react-native-reanimated';
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type ProgressState = 'initial' | 'scrolling' | 'completed';

export const useSharedProgressState = (progress: SharedValue<number>) => {
  // Derive the progress state based on the progress value
  const progressState: SharedValue<ProgressState> = useDerivedValue(() => {
    if (progress.value === 0) return 'initial';
    if (progress.value === 1) return 'completed';
    return 'scrolling';
  }, [progress]);

  // The initial view should be visible when the progress state is 'initial'
  const reanimatedInitialViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progressState.value === 'initial' ? 1 : 0),
    };
  }, []);

  // The scrolling view should be visible when the progress state is 'scrolling'
  const reanimatedScrollingViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progressState.value === 'scrolling' ? 1 : 0),
    };
  }, []);

  // The completed view should be visible when the progress state is 'completed'
  const reanimatedCompletedViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progressState.value === 'completed' ? 1 : 0),
      pointerEvents: progressState.value === 'completed' ? 'auto' : 'none',
    };
  }, []);

  return {
    progressState,
    reanimatedInitialViewStyle,
    reanimatedScrollingViewStyle,
    reanimatedCompletedViewStyle,
  };
};
