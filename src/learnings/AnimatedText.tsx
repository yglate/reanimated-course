import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Text as SkText,
  Canvas,
  useFont,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';

import { COLORS, DURATION } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sfProBold = require('../../assets/fonts/SF-Pro-Rounded-Bold.otf');

const canvasWidth = 200;
const canvasHeight = 200;

const AnimatedText = () => {
  const count = useSharedValue(0);

  const fontSize = 150;
  const font = useFont(sfProBold, fontSize);

  const countString = useDerivedValue(() => {
    return Math.floor(count.value).toString();
  }, [count]);

  const x = useDerivedValue(() => {
    const textWidth = font?.measureText(countString.value).width ?? 0;
    return canvasWidth / 2 - textWidth / 1.85;
  }, [font]);

  const y = useDerivedValue(() => {
    return canvasHeight / 2 + fontSize / 2.8;
  }, [fontSize]);

  const c = useDerivedValue(() => {
    return vec(x.value, y.value);
  });

  // We are moving inline onPress in below constants
  const changeCount = () => {
    count.value = withTiming(Math.random() * 100, {
      duration: DURATION.MS_500,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Canvas
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}>
        <SkText font={font} text={countString} x={x} y={y}>
          <SweepGradient c={c} colors={['cyan', 'magenta', 'yellow', 'cyan']} />
        </SkText>
      </Canvas>
      <TouchableOpacity style={styles.floatingButton} onPress={changeCount}>
        <FontAwesome name="random" size={24} color={COLORS.RED} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: 32,
    width: 64,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { AnimatedText };
