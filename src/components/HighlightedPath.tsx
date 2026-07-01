import {
  Canvas,
  Line,
  LinearGradient,
  Path,
  RoundedRect,
  Skia,
} from '@shopify/react-native-skia';
import { useMemo } from 'react';

import { COLORS } from '../constants';

type HighlightedPathProps = {
  width: number;
  height: number;
};

export const HighlightedPath = ({ height, width }: HighlightedPathProps) => {
  const internalCanvasHorizontalPadding = 2.5;
  const canvasWidth = width - internalCanvasHorizontalPadding * 2;

  const path = useMemo(() => {
    const skiaPath = Skia.Path.Make();

    skiaPath.moveTo(internalCanvasHorizontalPadding * 3, 0);
    skiaPath.lineTo(width - internalCanvasHorizontalPadding * 3, 0);
    skiaPath.lineTo(width, height);
    skiaPath.lineTo(0, height);
    skiaPath.close();

    return skiaPath;
  }, [height, width]);

  return (
    <Canvas
      style={{
        width,
        height,
      }}>
      <Path path={path} color={COLORS.WHITE} opacity={0.5}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: height * 1.5 }}
          colors={[COLORS.WHITE, COLORS.TRANSPARENT]}
        />
      </Path>
      <RoundedRect
        x={internalCanvasHorizontalPadding}
        y={0}
        width={canvasWidth}
        height={7}
        r={20}
        color={COLORS.WHITE}
      />
    </Canvas>
  );
};
