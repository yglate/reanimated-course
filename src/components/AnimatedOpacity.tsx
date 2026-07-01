import type { PropsWithChildren } from 'react';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type AnimatedOpacityProps = PropsWithChildren<{
  isVisible: boolean;
  minOpacity?: number;
}>;

export const AnimatedOpacity = ({
  isVisible,
  minOpacity = 0,
  children,
}: AnimatedOpacityProps) => {
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible ? 1 : minOpacity),
    };
  }, [isVisible, minOpacity]);

  return <Animated.View style={reanimatedStyle}>{children}</Animated.View>;
};
