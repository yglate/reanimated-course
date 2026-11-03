import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';
import { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const CHART_HEIGHT = 160;

export const ZigzagChart = ({
  points,
  title,
  subtitle,
  color = '#0284c7',
}: Readonly<{
  points: { x: number; y: number }[];
  title: string;
  subtitle: string;
  color?: string;
}>) => {
  const progress = useSharedValue(0);

  const pathBuilder = Skia.PathBuilder.Make();
  pathBuilder.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    pathBuilder.lineTo(points[i].x, points[i].y);
  }

  const zigzagPath = pathBuilder.detach();

  const triggerAnimate = useCallback(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1100,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  useEffect(() => {
    triggerAnimate();
  }, [triggerAnimate]);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        <Pressable onPress={triggerAnimate} style={styles.refreshButton}>
          <Text style={[styles.refreshText, { color }]}>Replay</Text>
        </Pressable>
      </View>

      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <Path
            path={zigzagPath}
            color={color}
            style="stroke"
            strokeWidth={3}
            strokeCap="round"
            strokeJoin="round"
            start={0}
            end={progress}
          />
          <Circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={4.5}
            color={color}
          />
        </Canvas>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#263247',
    backgroundColor: '#141c2b',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#f8fafc',
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  refreshButton: {
    backgroundColor: '#202b3d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0284c7',
  },
  canvasContainer: {
    height: CHART_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
});
