import {Animated} from 'react-native';

export const showBottomBar = bottomBar => {
  Animated.parallel([
    Animated.timing(bottomBar, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]).start();
};

export const hideBottomBar = bottomBar => {
  Animated.parallel([
    Animated.timing(bottomBar, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

export const panBottomBar = (bottomBar, value) => {
  Animated.parallel([
    Animated.timing(bottomBar, {
      toValue: value,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

export const slideSideMenu = (sideBar, value) => {
  Animated.parallel([
    Animated.timing(sideBar, {
      toValue: value,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};
export const showMapViewControls = (cashBox, sideBar) => {
  Animated.parallel([
    Animated.timing(cashBox, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(sideBar, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

export const hideMapViewControls = (cashBox, panelHeight, sideBar, height) => {
  Animated.parallel([
    Animated.timing(cashBox, {
      toValue: -height,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(panelHeight, {
      toValue: -height,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(sideBar, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

export const showCard = (panelHeight, panelDisplay, sideBar, height) => {
  Animated.parallel([
    Animated.timing(panelHeight, {
      toValue: height,
      duration: 250,
      useNativeDriver: false,
    }),
    Animated.timing(panelDisplay, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),

    Animated.timing(sideBar, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

export const hideCard = (panelHeight, panelDisplay, sideBar, height) => {
  Animated.parallel([
    Animated.timing(panelHeight, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }),
    Animated.timing(panelDisplay, {
      toValue: -height,
      duration: 250,
      useNativeDriver: true,
    }),

    Animated.timing(sideBar, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

export const showNavigationCard = navigationBox => {
  Animated.parallel([
    Animated.timing(navigationBox, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }),
  ]).start();
};

export const hideNavigationCard = (navigationBox, height) => {
  Animated.parallel([
    Animated.timing(navigationBox, {
      toValue: -height,
      duration: 250,
      useNativeDriver: false,
    }),
  ]).start();
};
