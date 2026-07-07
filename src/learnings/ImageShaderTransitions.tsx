import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Canvas,
  Fill,
  ImageShader,
  Shader,
  useImage,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { COLORS, ScreenWidth } from '../constants';
import {
  butterflyShaderEffect,
  directionWarpShaderEffect,
  fadeShaderEffect,
} from '../helper';

const ImageShaderTransitions = () => {
  const canvasHeight = 600;
  const canvasWidth = ScreenWidth * 0.95;

  const FIRST_IMAGE =
    'https://images.unsplash.com/photo-1596501048547-e9acb71ca798?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const SECOND_IMAGE =
    'https://images.unsplash.com/photo-1531168556467-80aace0d0144?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const firstImage = useImage(FIRST_IMAGE);
  const secondImage = useImage(SECOND_IMAGE);

  const progress = useSharedValue(0);

  const uniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      resolution: [canvasWidth, canvasHeight],
    };
  }, [canvasWidth, canvasHeight]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Slider
        style={styles.slider}
        minimumTrackTintColor={COLORS.PROGRESS_INDICATOR_ACTIVE}
        maximumTrackTintColor={COLORS.PROGRESS_INDICATOR_INACTIVE}
        onValueChange={value => {
          progress.value = value;
        }}
        tapToSeek
      />

      <Canvas
        style={[
          {
            height: canvasHeight,
            width: canvasWidth,
          },
          styles.canvas,
        ]}>
        <Fill>
          <Shader source={directionWarpShaderEffect!} uniforms={uniforms}>
            <ImageShader
              width={canvasWidth}
              height={canvasHeight}
              image={firstImage}
              fit="cover"
            />
            <ImageShader
              width={canvasWidth}
              height={canvasHeight}
              image={secondImage}
              fit="cover"
            />
          </Shader>
        </Fill>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  slider: {
    width: '90%',
    marginTop: 60,
    alignSelf: 'center',
  },
  canvas: {
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 25,
  },
});

export { ImageShaderTransitions };
