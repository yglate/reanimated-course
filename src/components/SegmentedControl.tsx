import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '../constants';
import { ScreenWidth } from '../constants/constants';
import { SegmentedControlOptionType } from '../types';

type SegmentedControlProps = {
  options: SegmentedControlOptionType[];
  selectedOption: SegmentedControlOptionType;
  onOptionPress?: (option: SegmentedControlOptionType) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const internalPadding = 20;
    const segmentedControlWidth = ScreenWidth - internalPadding * 2;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const reanimatedStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2,
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 20,
            paddingLeft: internalPadding / 2,
          },
        ]}>
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            reanimatedStyle,
            styles.activeBox,
          ]}
        />
        {options.map(option => {
          const isActiveOption = selectedOption === option;

          return (
            <Pressable
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}>
              <Text
                style={[styles.label, isActiveOption && styles.activeLabel]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: COLORS.BASE_GRAY_05,
  },
  activeBox: {
    position: 'absolute',
    borderRadius: 15,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: '80%',
    top: '10%',
    backgroundColor: COLORS.BACKGROUND,
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'SF-Pro-Rounded-Bold',
    fontSize: 16,
    color: COLORS.MEDIUM_GREY,
  },
  activeLabel: {
    color: COLORS.BLUE,
  },
});

export { SegmentedControl };
