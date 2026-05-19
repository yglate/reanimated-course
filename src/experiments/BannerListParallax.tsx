import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollOffset,
} from 'react-native-reanimated';

import {
  BannerItem,
  ITEM_HEIGHT,
  LIST_PADDING,
} from '../components/BannerItem';
import { CAROUSEL_IMAGES } from '../constants/constants';
import { COLORS } from '../constants';

const BannerListParallax = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        {CAROUSEL_IMAGES.map((imageUri, index) => (
          <BannerItem
            key={imageUri}
            imageUri={imageUri}
            index={index}
            scrollOffset={scrollOffset}
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
    paddingTop: LIST_PADDING,
    paddingBottom: LIST_PADDING,
  },
});

export { BannerListParallax };
