import { Tabs } from 'expo-router';
import { useCallback } from 'react';

import { SCREEN_NAMES } from '../../src/constants';
import { BottomTabAnimation } from '../../src/learnings/BottomTabAnimation';

export default function Layout() {
  const tabBar = useCallback(() => {
    return <BottomTabAnimation />;
  }, []);

  return (
    <Tabs tabBar={tabBar}>
      {Object.values(SCREEN_NAMES).map(screenName => {
        return (
          <Tabs.Screen
            key={screenName}
            name={screenName}
            options={{ title: screenName }}
          />
        );
      })}
    </Tabs>
  );
}
