import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BUTTON_ITEMS, COLORS } from '../../constants';

import TouchableFeedback from './TouchableFeedback';
import { ButtonItemType } from '../../types';

interface ButtonsGridProps {
  onButtonPressed?: (item: ButtonItemType) => void;
}

const ButtonsGrid = ({ onButtonPressed }: ButtonsGridProps) => {
  return (
    <View style={styles.container}>
      {BUTTON_ITEMS.map(item => (
        <View key={item} style={styles.buttonContainer}>
          <TouchableFeedback
            enabled={item !== null}
            style={styles.button}
            onPress={() => {
              return onButtonPressed?.(item);
            }}>
            {(typeof item === 'number' || item === 'C') && (
              <Text style={styles.buttonText}>{item}</Text>
            )}
            {item === 'backspace' && (
              <FontAwesome5 name="backspace" size={24} color={COLORS.WHITE} />
            )}
          </TouchableFeedback>
        </View>
      ))}
    </View>
  );
};

export { ButtonsGrid };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: '33.33%',
    height: '25%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  button: {
    flex: 1,
    borderRadius: 20,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'SF-Pro-Rounded-Bold',
    color: COLORS.WHITE,
  },
});
