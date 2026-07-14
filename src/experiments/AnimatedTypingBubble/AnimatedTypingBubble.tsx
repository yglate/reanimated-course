import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '../../constants';

import { TypingDot } from './components/TypingDot';

const dotsDelayArray = [0, 150, 300];

const AnimatedTypingBubble = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        {dotsDelayArray.map((delay, index) => (
          <TypingDot delay={delay} key={delay + index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    margin: 10,
  },
});

export { AnimatedTypingBubble };
