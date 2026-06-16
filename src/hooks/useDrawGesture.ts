import type { SkPath } from '@shopify/react-native-skia';
import { Skia } from '@shopify/react-native-skia';
import { Gesture } from 'react-native-gesture-handler';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

type UseDrawGestureParams = {
  onComplete: (completedPath: SkPath) => void;
};

export const useDrawGesture = ({ onComplete }: UseDrawGestureParams) => {
  const skiaPath = useSharedValue(Skia.Path.Make());
  const isDrawing = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onBegin(({ x, y }) => {
      skiaPath.value = Skia.Path.Make();
      isDrawing.value = true;
      // Move to the initial point of the gesture instead of beginning at (0, 0)
      skiaPath.value.moveTo(x, y);
    })
    .onUpdate(({ x, y }) => {
      skiaPath.value.lineTo(x, y);
      skiaPath.value = Skia.Path.MakeFromSVGString(
        skiaPath.value.toSVGString(),
      )!;
    })
    .onFinalize(() => {
      isDrawing.value = false;
      scheduleOnRN(onComplete, skiaPath.value);
    });

  const pathOpacity = useDerivedValue(() => {
    return withTiming(isDrawing.value ? 1 : 0);
  }, []);

  return { panGesture, skiaPath, pathOpacity };
};
