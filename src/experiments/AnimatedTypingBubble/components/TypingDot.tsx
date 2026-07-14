import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '../../../constants';

interface TypingDotProps {
  delay: number;
  dotSize?: number;
  moveUpDuration?: number;
  moveDownDuration?: number;
  resetDuration?: number;
}

export const TypingDot = ({
  delay,
  dotSize = 8,
  moveDownDuration = 350,
  moveUpDuration = 300,
  resetDuration = 400,
}: TypingDotProps) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Creates a repeating loop: moves up, moves back to 0, stays at 0 during the delay
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: moveUpDuration }), // Move up
          withTiming(0, { duration: moveDownDuration }), // Move down
          withTiming(0, { duration: resetDuration }), // Rest before next cycle
        ),
        -1, // Infinite loop
        false, // Do not reverse sequence automatically
      ),
    );
  }, [delay, moveDownDuration, moveUpDuration, resetDuration, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          marginHorizontal: dotSize / 3,
          backgroundColor: COLORS.PROGRESS_INDICATOR_ACTIVE,
        },
        animatedStyle,
      ]}
    />
  );
};
