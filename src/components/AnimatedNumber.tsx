import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '../constants';

interface AnimatedNumberProps {
  number: string;
}

const AnimatedNumber = ({ number }: AnimatedNumberProps) => {
  const numbers = useMemo(() => {
    return number.split('');
  }, [number]);

  const reanimatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(1.05 - 0.05 * numbers.length),
        },
      ],
    };
  }, [numbers]);

  return (
    <Animated.View
      style={[{ flexDirection: 'row' }, reanimatedContainerStyle]}
      layout={LinearTransition}>
      {numbers.map((num, index) => (
        <Animated.Text
          key={num + index}
          style={styles.text}
          layout={LinearTransition}
          entering={FadeInDown}
          exiting={FadeOutDown}>
          {num}
        </Animated.Text>
      ))}
    </Animated.View>
  );
};

export { AnimatedNumber };

const styles = StyleSheet.create({
  text: {
    fontSize: 90,
    color: COLORS.WHITE,
    fontFamily: 'SF-Pro-Rounded-Bold',
    marginHorizontal: 2,
  },
});
