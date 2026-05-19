import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { ScreenWidth, ScreenHeight } from '../constants/constants';

type Direction = 'horizontal' | 'vertical';

interface ListImageProps {
  imageUri: string;
  itemWidth: number;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  scrollOffset: SharedValue<number>;
  index: number;
  direction?: Direction;
}

export const ListImage = ({
  imageUri,
  itemWidth,
  imageContainerStyle,
  imageStyle,
  scrollOffset,
  index,
  direction = 'horizontal',
}: ListImageProps) => {
  const inputRange = [
    itemWidth * (index - 1),
    itemWidth * index,
    itemWidth * (index + 1),
  ];

  const reanimatedImageStyle = useAnimatedStyle(() => {
    const isVertical = direction === 'vertical';
    const outputRange = isVertical
      ? [-ScreenHeight / 2, 0, ScreenHeight / 2]
      : [-ScreenWidth / 2, 0, ScreenWidth / 2];
    const translate = interpolate(scrollOffset.value, inputRange, outputRange);

    return {
      transform: [
        {
          scale: 1.7,
        },
        isVertical ? { translateY: translate } : { translateX: translate },
      ],
    };
  });

  const reanimatedContainerStyle = useAnimatedStyle(() => {
    const outputRange = [1, 1.05, 1];
    const scale = interpolate(scrollOffset.value, inputRange, outputRange);

    return {
      transform: [
        {
          scale: scale,
        },
      ],
    };
  });

  return (
    <Animated.View style={[imageContainerStyle, reanimatedContainerStyle]}>
      <Animated.Image
        key={imageUri}
        source={{ uri: imageUri }}
        style={[imageStyle, reanimatedImageStyle]}
      />
    </Animated.View>
  );
};
