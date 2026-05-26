import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  Text as SkText,
  Canvas,
  useFont,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, DURATION } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sfProBold = require('../../assets/fonts/SF-Pro-Rounded-Bold.otf');

const canvasWidth = 200;
const canvasHeight = 200;

const AnimatedTimer = () => {
  const count = useSharedValue(10);
  const isRunning = useSharedValue(false);
  const [iconName, setIconName] = useState<'play' | 'pause'>('play');

  const fontSize = 150;
  const font = useFont(sfProBold, fontSize);

  const countString = useDerivedValue(() => {
    return Math.floor(count.value).toString();
  }, [count]);

  const x = useDerivedValue(() => {
    const textWidth = font?.measureText(countString.value).width ?? 0;
    return canvasWidth / 2 - textWidth / 1.85;
  }, [font, countString]);

  const y = useDerivedValue(() => {
    return canvasHeight / 2 + fontSize / 2.8;
  }, [fontSize]);

  const c = useDerivedValue(() => {
    return vec(x.value, y.value);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentCount = count.value;
      const running = isRunning.value;

      if (running && currentCount >= 1) {
        count.value = withTiming(currentCount - 1, {
          duration: DURATION.MS_1000,
        });
        if (currentCount - 1 <= 0) {
          isRunning.value = false;
          scheduleOnRN(setIconName, 'play');
        }
      }
    }, DURATION.MS_1000);

    return () => clearInterval(interval);
  }, [count, isRunning]);

  const toggleTimer = () => {
    if (count.value === 0) {
      count.value = withTiming(10);
    }
    const newState = !isRunning.value;
    isRunning.value = newState;
    setIconName(newState ? 'pause' : 'play');
  };

  const resetCount = () => {
    count.value = withTiming(10);
    isRunning.value = false;
    setIconName('play');
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
          <SweepGradient
            c={c}
            colors={['magenta', 'cyan', 'yellow', 'magenta']}
          />
        </SkText>
      </Canvas>
      <TouchableOpacity style={styles.startButton} onPress={toggleTimer}>
        <FontAwesome name={iconName} size={24} color={COLORS.RED} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatingButton} onPress={resetCount}>
        <FontAwesome name="refresh" size={24} color={COLORS.RED} />
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
  startButton: {
    position: 'absolute',
    bottom: 48,
    right: '50%',
    width: 64,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: '30%',
    width: 64,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { AnimatedTimer };
