import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SquareSize = 120;

const BouncingSquare = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // position animation shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
        // { translateX: translateX.value },
        // { translateY: translateY.value },
        //Wrong order, the square will first scale and rotate and then translate, which is not what we want.
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        style={[styles.square, reanimatedStyle]}
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withRepeat(withTiming(rotate.value + 90), 4, false); // With repeat, the animation will repeat 4 times and then stop.
          // rotate.value = withTiming(rotate.value + 90);
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const MaxTranslationAmount = 100;
          // We want to update translateX between [-100,100]
          const nextTranslateX =
            Math.random() * MaxTranslationAmount * 2 - MaxTranslationAmount;
          const nextTranslateY =
            Math.random() * MaxTranslationAmount * 2 - MaxTranslationAmount;
          translateX.value = withSpring(nextTranslateX);
          translateY.value = withSpring(nextTranslateY);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: '#111111',
    borderRadius: 32,
    position: 'absolute',
    bottom: 48,
    right: 32,
  },
  square: {
    width: SquareSize,
    height: SquareSize,
    backgroundColor: '#00a6ff',
    borderRadius: 30,
    borderCurve: 'continuous', // Only for iOS
  },
});

export { BouncingSquare };
