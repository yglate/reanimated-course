import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { AnimatedNumber } from '../components/AnimatedNumber';
import { ButtonsGrid } from '../components/ButtonsGrid';
import { COLORS } from '../constants';
import { ButtonItemType } from '../types';

const FamilyNumberInput = () => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const [number, setNumber] = useState('0');

  const onButtonPressed = useCallback((item: ButtonItemType) => {
    if (item === 'C') {
      setNumber('0');
      return;
    }
    if (item === 'backspace') {
      setNumber(previousNumber =>
        previousNumber.length > 1 ? previousNumber.slice(0, -1) : '0',
      );
      return;
    }
    setNumber(previousNumber => {
      if (previousNumber.length === 10) {
        Alert.alert('Maximum number length reached');
        return previousNumber;
      }
      if (previousNumber === '0') {
        return String(item);
      }
      return previousNumber + item;
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.numberContainer}>
        <AnimatedNumber number={number} />
        <LinearGradient
          colors={['transparent', COLORS.BLACK]}
          style={styles.numberGradient}
          locations={[0, 0.7]}
        />
      </View>
      <View style={{ flex: 1, marginBottom: safeBottom }}>
        <ButtonsGrid onButtonPressed={onButtonPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
  },
});

export { FamilyNumberInput };
