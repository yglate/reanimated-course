import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {
  BOTTOM_TAB_BAR_HEIGHT,
  COLORS,
  SCREEN_NAMES,
  ScreenWidth,
} from '../constants';
import { getIconByScreenName } from '../helper/getIconByScreenName';
import { AnimatedOpacity } from '../components/AnimatedOpacity';
import { HighlightedPath } from '../components/HighlightedPath';

const BottomTabAnimation = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { bottom: safeBottom } = useSafeAreaInsets();

  const tabBarWidth = ScreenWidth * 0.85;
  const internalHorizontalPadding = ScreenWidth * 0.05;
  const tabBarItemWidth =
    (tabBarWidth - internalHorizontalPadding * 2) /
    Object.values(SCREEN_NAMES).length;

  const reanimatedHighlightedViewStyle = useAnimatedStyle(() => {
    const offset =
      tabBarItemWidth *
      Object.values(SCREEN_NAMES)
        .map(screenName => `/${screenName}`)
        .indexOf(pathName);

    return {
      left: withTiming(internalHorizontalPadding + offset),
    };
  }, [internalHorizontalPadding, tabBarItemWidth, pathName]);

  return (
    <View
      style={[
        {
          width: tabBarWidth,
          marginBottom: safeBottom,
          paddingHorizontal: internalHorizontalPadding,
        },
        styles.container,
      ]}>
      <Animated.View
        style={[
          {
            width: tabBarItemWidth,
          },
          styles.highlightedView,
          reanimatedHighlightedViewStyle,
        ]}>
        <HighlightedPath
          width={tabBarItemWidth}
          height={BOTTOM_TAB_BAR_HEIGHT}
        />
      </Animated.View>
      {Object.values(SCREEN_NAMES).map(screenName => {
        return (
          <TouchableOpacity
            key={screenName}
            style={styles.fillCenter}
            onPress={() => {
              router.navigate(`/${screenName}`);
            }}>
            {/* <AnimatedOpacity isVisible={pathName === `/${screenName}`}> */}
            {/* Both are ok */}
            <AnimatedOpacity
              isVisible={pathName.includes(screenName)}
              minOpacity={0.5}>
              <View style={styles.fillCenter}>
                {getIconByScreenName(screenName)}
                <Text style={styles.tabBarNameText}>{screenName}</Text>
              </View>
            </AnimatedOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BOTTOM_TAB_BAR_HEIGHT,
    alignSelf: 'center',
    borderRadius: 30,
    borderCurve: 'continuous',
    backgroundColor: COLORS.BLACK,
    flexDirection: 'row',
  },
  fillCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedView: {
    position: 'absolute',
    height: BOTTOM_TAB_BAR_HEIGHT,
  },
  tabBarNameText: {
    color: COLORS.WHITE,
    fontSize: 12,
    marginTop: 2,
  },
});

export { BottomTabAnimation };
