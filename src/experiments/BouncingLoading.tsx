import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { COLORS, DURATION } from '../constants';

const LoadingContainerSize = 125;

const BouncingLoading = () => {
  const rotate = useSharedValue(0);

  const textOpacity = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      // We rotate the container to create the bouncing effect
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      // We need to rotate the image in the opposite direction to keep it straight
      transform: [{ rotate: `-${rotate.value}deg` }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      // We animate the opacity of the text to create a fading effect
      opacity: textOpacity.value,
    };
  });

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(rotate.value + 360, { duration: DURATION.MS_2000 }),
      -1,
      false,
    );

    textOpacity.value = withRepeat(
      withTiming(0.3, { duration: DURATION.MS_1000 }),
      -1,
      true,
    );
  }, [rotate, textOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.View style={[styles.loadingContainer, reanimatedStyle]}>
        <Animated.Image
          source={require('../assets/communicator_logo.png')}
          style={[
            {
              width: LoadingContainerSize,
              height: LoadingContainerSize,
            },
            imageAnimatedStyle,
          ]}
        />
      </Animated.View>
      <Animated.Text style={[styles.pleaseWaitText, textAnimatedStyle]}>
        Please Wait ...
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    height: LoadingContainerSize,
    width: LoadingContainerSize,
    backgroundColor: COLORS.BLACK,
    borderRadius: 30,
    borderCurve: 'continuous', // Only for iOS
  },
  pleaseWaitText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { BouncingLoading };
