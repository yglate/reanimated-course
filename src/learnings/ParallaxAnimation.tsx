import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollOffset,
} from 'react-native-reanimated';

import { ListImage } from '../components/ListImage';
import { COLORS } from '../constants';
import { CAROUSEL_IMAGES, ScreenWidth } from '../constants/constants';

const ListImageWidth = ScreenWidth * 0.8;

const ItemInternalPadding = 10;
const ItemContainerWidth = ListImageWidth + ItemInternalPadding * 2;

const ListPadding = (ScreenWidth - ItemContainerWidth) / 2;

const ParallaxAnimation = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollOffset(scrollRef);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={ItemContainerWidth}
        pagingEnabled
        decelerationRate="fast">
        {CAROUSEL_IMAGES.map((imageUri, index) => (
          <ListImage
            key={imageUri}
            imageUri={imageUri}
            itemWidth={ItemContainerWidth}
            imageContainerStyle={[
              styles.imageContainer,
              { marginHorizontal: ItemInternalPadding },
            ]}
            imageStyle={[styles.image, { width: ListImageWidth }]}
            scrollOffset={scrollOffset}
            index={index}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingLeft: ListPadding,
    paddingRight: ListPadding,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  image: {
    aspectRatio: 0.6,
  },
});

export { ParallaxAnimation };
