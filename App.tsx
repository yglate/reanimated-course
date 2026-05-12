/* eslint-disable import/no-default-export */
/* eslint-disable import/no-anonymous-default-export */
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { App } from './src';

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
};
