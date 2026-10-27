import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { STRINGS } from '../constants';

import { StringRow } from './components/StringRow';

export const MultiElasticStringsDemo = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Spring Physics - Using Skia</Text>
          <Text style={styles.subtitle}>Pull and release each string</Text>
        </View>

        <View style={styles.list}>
          {STRINGS.map(item => (
            <StringRow key={item.id} config={item} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 4,
  },
  list: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 24,
  },
});
