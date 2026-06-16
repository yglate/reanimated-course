import { BUTTON_ITEMS, SEGMENTED_CONTROL_OPTIONS } from '../constants';

export type ButtonItemType = (typeof BUTTON_ITEMS)[number];
export type SegmentedControlOptionType =
  (typeof SEGMENTED_CONTROL_OPTIONS)[number];

export type PathPoint = {
  x: number;
  y: number;
};
