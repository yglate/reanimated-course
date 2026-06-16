import React, { useEffect } from 'react';
import { SegmentedControlOptionType } from '../types';
import {
  COLORS,
  LIGHT_GRAPH_SCORES,
  PRO_GRAPH_SCORES,
  STANDARD_GRAPH_SCORES,
} from '../constants';
import {
  Canvas,
  CornerPathEffect,
  DashPathEffect,
  Extrapolate,
  Group,
  Line,
  Path,
  usePathInterpolation,
  vec,
} from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { getNormalizedY, getPathFromScores } from '../helper/getPathFromScores';

interface ScoreGraphProps {
  option: SegmentedControlOptionType;
  width: number;
  height: number;
}

const ScoreGraph = ({ option, width, height }: ScoreGraphProps) => {
  const internalVerticalPadding = 50;
  const internalHorizontalPadding = 20;
  const fixedHeight = height - internalVerticalPadding * 2;
  const fixedWidth = width - internalHorizontalPadding * 2;

  const progress = useSharedValue(0);

  useEffect(() => {
    switch (option) {
      case 'Light':
        progress.value = 0;
        break;
      case 'Standard':
        progress.value = 0.5;
        break;
      case 'Pro':
        progress.value = 1;
        break;
    }
  }, [option]);

  const animatedProgress = useDerivedValue(() => {
    return withSpring(progress.value);
  }, []);

  const animatedPath = usePathInterpolation(
    animatedProgress,
    [0, 0.5, 1],
    [
      getPathFromScores(LIGHT_GRAPH_SCORES, fixedWidth, fixedHeight),
      getPathFromScores(STANDARD_GRAPH_SCORES, fixedWidth, fixedHeight),
      getPathFromScores(PRO_GRAPH_SCORES, fixedWidth, fixedHeight),
    ],
    Extrapolate.CLAMP,
  );

  return (
    <Canvas style={{ width, height }}>
      <Group
        transform={[
          {
            translateY: internalVerticalPadding,
          },
        ]}>
        <Line
          p1={vec(0, getNormalizedY(70, fixedHeight))}
          p2={vec(width, getNormalizedY(70, fixedHeight))}
          strokeWidth={2}
          color={COLORS.LIGHT_GREY}>
          <DashPathEffect intervals={[5, 5]} />
        </Line>
      </Group>
      <Group
        transform={[
          {
            translateY: internalVerticalPadding,
          },
          {
            translateX: internalHorizontalPadding,
          },
        ]}>
        <Path
          path={animatedPath}
          color={COLORS.BLUE}
          style={'stroke'}
          strokeWidth={4}
          strokeCap={'round'}>
          <CornerPathEffect r={15} />
        </Path>
      </Group>
    </Canvas>
  );
};

export { ScoreGraph };
