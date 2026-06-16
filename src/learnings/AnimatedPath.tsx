import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SegmentedControl } from '../components/SegmentedControl';
import { COLORS, ScreenWidth, SEGMENTED_CONTROL_OPTIONS } from '../constants';
import { ScoreGraph } from '../components/ScoreGraph';
import { SegmentedControlOptionType } from '../types';

const AnimatedPath = () => {
  const [selectedOption, setSelectedOption] =
    useState<SegmentedControlOptionType>(SEGMENTED_CONTROL_OPTIONS[1]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SegmentedControl
        options={SEGMENTED_CONTROL_OPTIONS}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
      <ScoreGraph option={selectedOption} width={ScreenWidth} height={250} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { AnimatedPath };
