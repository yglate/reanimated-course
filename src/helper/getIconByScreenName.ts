import React from 'react';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import { SCREEN_NAMES } from '../constants';

export const getIconByScreenName = (screenName: keyof typeof SCREEN_NAMES) => {
  switch (screenName) {
    case SCREEN_NAMES.Home:
      return React.createElement(Octicons, {
        name: 'home',
        size: 24,
        color: 'white',
      });
    case SCREEN_NAMES.Bookmark:
      return React.createElement(Feather, {
        name: 'bookmark',
        size: 24,
        color: 'white',
      });
    case SCREEN_NAMES.Add:
      return React.createElement(Ionicons, {
        name: 'add-circle-outline',
        size: 24,
        color: 'white',
      });
    case SCREEN_NAMES.Profile:
      return React.createElement(Octicons, {
        name: 'person',
        size: 24,
        color: 'white',
      });
    case SCREEN_NAMES.Settings:
      return React.createElement(Ionicons, {
        name: 'settings-sharp',
        size: 24,
        color: 'white',
      });
  }
};
