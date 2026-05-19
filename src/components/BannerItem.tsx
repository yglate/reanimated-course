import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { ScreenHeight, ScreenWidth } from '../constants/constants';

const BANNER_HEIGHT = ScreenHeight * 0.22;
const BANNER_WIDTH = ScreenWidth * 0.85;
const PARALLAX_OFFSET = 40;
const IMAGE_HEIGHT = BANNER_HEIGHT + PARALLAX_OFFSET * 2;
const ITEM_SPACING = 20;
const ITEM_HEIGHT = BANNER_HEIGHT + ITEM_SPACING * 2;

interface BannerItemProps {
  imageUri: string;
  index: number;
  scrollOffset: SharedValue<number>;
}

const BannerItem = ({ imageUri, index, scrollOffset }: BannerItemProps) => {
  const inputRange = [
    ITEM_HEIGHT * (index - 1),
    ITEM_HEIGHT * index,
    ITEM_HEIGHT * (index + 1),
  ];

  const animatedContainerStyle = useAnimatedStyle(() => {
    // Scale the active item (0.92 → 1.1 → 0.92)
    const scale = interpolate(
      scrollOffset.value,
      inputRange,
      [0.92, 1.1, 0.92],
    );

    return {
      transform: [{ scale }],
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    // Subtle parallax effect on the image
    const translateY = interpolate(scrollOffset.value, inputRange, [
      -PARALLAX_OFFSET,
      0,
      PARALLAX_OFFSET,
    ]);

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[styles.bannerContainer, animatedContainerStyle]}>
      <Animated.View style={[styles.bannerImageWrapper]}>
        <Animated.Image
          source={{ uri: imageUri }}
          style={[styles.bannerImage, animatedImageStyle]}
        />
      </Animated.View>
    </Animated.View>
  );
};

// Export for use in parent component
const LIST_PADDING = (ScreenHeight - ITEM_HEIGHT) / 2;

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: ITEM_SPACING,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImageWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: BANNER_WIDTH,
    height: IMAGE_HEIGHT,
  },
});

export { BannerItem, ITEM_HEIGHT, LIST_PADDING };
