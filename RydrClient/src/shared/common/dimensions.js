import React from 'react';
import {useWindowDimensions} from 'react-native';

module.Store = {
  getWindowDimensions: () => {
    const {width, height} = useWindowDimensions();
    return {width, height};
  },
};
if (global) {
  global.Store = module.Store;
}
