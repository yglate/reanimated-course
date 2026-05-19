import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollOffset,
} from 'react-native-reanimated';

import { ListImage } from '../components/ListImage';
import { COLORS } from '../constants';
import {
  CAROUSEL_IMAGES,
  ScreenHeight,
  ScreenWidth,
} from '../constants/constants';

const ListImageHeight = ScreenHeight * 0.8;
const ListImageWidth = ScreenWidth * 0.9;

const ItemInternalPadding = 20;
const ItemContainerHeight = ListImageHeight + ItemInternalPadding * 2;

const ListPadding = (ScreenHeight - ItemContainerHeight) / 2;

const VerticalParallaxAnimation = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollOffset(scrollRef);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={ItemContainerHeight}
        pagingEnabled
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        {CAROUSEL_IMAGES.map((imageUri, index) => (
          <ListImage
            key={imageUri}
            imageUri={imageUri}
            itemWidth={ItemContainerHeight}
            imageContainerStyle={styles.imageContainer}
            imageStyle={styles.image}
            scrollOffset={scrollOffset}
            index={index}
            direction="vertical"
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
    paddingTop: ListPadding,
    paddingBottom: ListPadding,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    marginVertical: ItemInternalPadding,
  },
  image: {
    width: ListImageWidth,
    height: ListImageHeight,
  },
});

export { VerticalParallaxAnimation };
