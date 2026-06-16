import { Skia } from '@shopify/react-native-skia';

/**
 * Normalizes a score value to fit within the graph's height.
 *
 * @param value - The score value to be normalized (expected to be between 0 and 100).
 * @param height - The total height of the graph area.
 * @returns A normalized Y coordinate for the given score value.
 */
export const getNormalizedY = (value: number, height: number) => {
  return height - (value / 100) * height;
};

/**
 * Converts an array of scores into a Skia Path for rendering a graph.
 *
 * @param scores - An array of numerical scores to be plotted.
 * @param width - The total width of the graph area.
 * @param height - The total height of the graph area.
 * @returns A Skia Path representing the line graph of the scores.
 */
export const getPathFromScores = (
  scores: number[],
  width: number,
  height: number,
) => {
  const skiaPath = Skia.Path.Make();
  for (let i = 0; i < scores.length; i++) {
    skiaPath.lineTo(
      (i * width) / scores.length,
      getNormalizedY(scores[i], height),
    );
  }
  return skiaPath;
};
