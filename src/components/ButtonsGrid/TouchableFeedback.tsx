import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

interface TouchableFeedbackProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
}

const TouchableFeedback = ({
  children,
  onPress,
  style,
  enabled = true,
}: TouchableFeedbackProps) => {
  const isActive = useSharedValue(false);

  const tapGesture = Gesture.Tap()
    .enabled(enabled)
    .onTouchesDown(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      if (onPress) {
        scheduleOnRN(onPress);
      }
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  const reanimatedButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isActive.value ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0)',
      ),
      transform: [{ scale: withTiming(isActive.value ? 0.95 : 1) }],
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[style, reanimatedButtonStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default TouchableFeedback;
