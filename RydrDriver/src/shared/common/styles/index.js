import {getStatusBarHeight} from 'react-native-status-bar-height';

// 44 - on iPhoneX
// 20 - on iOS device
// X - on Android platfrom (runtime value)
// 0 - on all other platforms (default)
//console.log(getStatusBarHeight());

// will be 0 on Android, because You pass true to skipAndroid
//console.log(getStatusBarHeight(true));

export const colors = {
  buttons: '#dbbb24',
  darkText: '#252525',
  darkBlue: '#104E8B',
  themeColor: '#E8F2FD',
  statusbar: '#ff8c52',
  dodgerblue: '#1C86EE',
  heaherText: 'white',
  lightgreen: '#66DF48',
  brightgreen: '#00ff00',
  green: '#42d742',
  darkGreen: '#1ca311',
  blue: '#286ef0',
  lightblack: '#403f40',
  black: '#000000',
  secondaryBlack: '#323232',
  yellow: '#dbbb24',
  white: '#ffffff',
  softwhite: '#eeeeee',
  red: '#D0342C',
  darkRed: '#720300',
  grey: '#e8e8e8',
  lightgrey: '#f3f1eb',
  deepBlue: '#051C60',
};

export const transparentColor = {
  buttons: 'rgba(219, 187, 36, 0.5)',
  darkText: 'rgba(37, 37, 37, 0.5)',
  darkBlue: 'rgba(16, 78, 139, 0.8)',
  themeColor: 'rgba(232, 242, 253, 0.5)',
  statusbar: '#ff8c52',
  dodgerblue: 'rgba(232, 242, 253, 0.5)',
  lightgreen: 'rgba(102, 223, 72, 0.5)',
  brightgreen: '#00ff00',
  green: 'rgba(66, 215, 66, 0.5)',
  blue: 'rgba(40, 110, 240, 0.5)',
  lightblack: 'rgba(64, 63, 64, 0.5)',
  black: 'rgba(0, 0, 0, 0.5)',
  secondaryBlack: 'rgba(50, 50, 50, 0.5)',
  yellow: 'rgba(219, 187, 36, 0.5)',
  white: 'rgba(255, 255, 255, 0.5)',
  softwhite: 'rgba(238, 238, 238, 0.5)',
  red: 'rgba(208, 52, 44, 0.5)',
  grey: 'rgba(232, 232, 232, 0.5)',
  deepBlue: 'rgba(5, 28, 96, 0.5)',
};

export const parameters = {
  statusBarHeight: getStatusBarHeight(),
  headerHeight: 70,

  styledButton: {
    backgroundColor: colors.statusbar,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.statusbar,
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
  },

  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
};

export const title = {
  color: colors.statusbar,
  fontSize: 20,
  fontWeight: 'bold',
};

export const text = {
  textLight: {
    color: colors.softwhite,
    fontSize: 20,
  },
};

export const buttons = {
  headerButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dodgerblue,
    borderRadius: 50,
    top: 5,
  },

  roundButton: {
    backgroundColor: colors.dodgerblue,
    padding: 10,
    borderRadius: 50,
    zIndex: 100,
  },

  cancelButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightblack,
    width: 100,
    height: 50,
    borderRadius: 5,
    left: 10,
  },

  largeButtonBottom: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightblack,
    width: '100%',
    height: 100,
    borderRadius: 50,
  },

  modalToggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-around',
    borderRadius: 5,
  },
};
