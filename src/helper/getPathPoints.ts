import { SkPath } from '@shopify/react-native-skia';
import { PathPoint } from '../types';
import { PathGeometry } from './getPathGeometry';

/**
 * Returns an array of points along the given SkPath.
 * @param path The SkPath to extract points from.
 * @returns An array of PathPoint objects representing points along the path.
 */
export const getPathPoints = (path: SkPath) => {
  const points: PathPoint[] = [];

  // Easy Solution: We can use the `getPoints` method to get all the points of the path at once.

  // const countPoints = path.countPoints();
  // for (let i = 0; i < countPoints; i++) {
  //   const point = path.getPoint(i);
  //   points.push({ x: point.x, y: point.y });
  // }
  // return points;

  //Contour Solution

  const geometry = new PathGeometry(path);
  const totalLength = geometry.getTotalLength();

  for (let i = 0; i < totalLength; i++) {
    const point = geometry.getPointAtLength(i);
    if (i % 10 === 0) {
      points.push({ x: point.x, y: point.y });
    }
  }

  return points;
};
