import { BUTTON_ITEMS, SEGMENTED_CONTROL_OPTIONS } from '../constants';

export type ButtonItemType = (typeof BUTTON_ITEMS)[number];
export type SegmentedControlOptionType =
  (typeof SEGMENTED_CONTROL_OPTIONS)[number];

export type PathPoint = {
  x: number;
  y: number;
};

export interface GestureItem {
  id: string;
  name: string;
  description: string;
  example: string;
}

export interface StringConfig {
  id: number;
  name: string;
  spec: string;
  color: string;
  strokeWidth: number;
  springConfig: {
    damping: number;
    stiffness: number;
    mass: number;
  };
}
