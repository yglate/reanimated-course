/* eslint-disable import/no-default-export */
/* eslint-disable import/no-anonymous-default-export */
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importing the custom font
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import sfProRoundedBold from './assets/fonts/SF-Pro-Rounded-Bold.otf';
import { App } from './src';

// AppContainer component definition
const AppContainer = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'SF-Pro-Rounded-Bold': sfProRoundedBold,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return <App />;
};

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
