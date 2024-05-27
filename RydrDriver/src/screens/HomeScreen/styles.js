import {Dimensions, StyleSheet} from 'react-native';
import {colors, transparentColor} from '../../shared/common/styles';

export const useStyle = () => {
  const {width, height} = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: width,
      backgroundColor: colors.softwhite,
      position: 'relative',
      flex: 1,
    },
    sideMenu: {
      position: 'absolute',
      right: 2.5,
      top: '45%',
    },
    bottomContainer: {
      width: width,
      position: 'relative',
      bottom: 0,
    },
    roundButton: {
      position: 'absolute',
      backgroundColor: colors.darkBlue,
      padding: 10,
      borderRadius: 30,
    },
    pauseButton: {
      position: 'absolute',
      backgroundColor: colors.darkBlue,
      padding: 10,
      borderRadius: 30,
    },
    expandedButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: 125,
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    goButton: {
      position: 'absolute',
      backgroundColor: '#1495ff',
      width: 75,
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      bottom: 110,
      left: width / 2 - 37,
    },
    goText: {
      fontSize: 30,
      color: colors.themeColor,
      fontWeight: 'bold',
    },
    balanceButtonContents: {
      display: 'flex',
      flexDirection: 'row',
    },
    cardContent: {
      position: 'absolute',
      left: width / 2 - (width - 50) / 2,
      width: '100%',
      height: height,
    },
    cardContainer: {
      position: 'absolute',
      top: 0,
      width: width,
      backgroundColor: transparentColor.black,
    },
    card: {
      width: width - 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
    },
    balanceButton: {
      position: 'absolute',
      backgroundColor: colors.themeColor,
      borderWidth: 1,
      borderColor: colors.darkBlue,
      minWidth: '25%',
      borderRadius: 5,
      top: 10,
      left: width / 2 - 50,
    },
    balanceContainer: {
      backgroundColor: colors.softwhite,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 0,
      borderRadius: 5,
    },

    balanceText: {
      fontSize: 24,
      color: colors.darkText,
      fontWeight: 'bold',
    },
    toggleSwitch: {
      position: 'absolute',
      bottom: 25,
      left: '25%',
      zIndex: 100,
    },
    activityIndicator: {
      display: 'flex',
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    markerImage: {
      backgroundColor: colors.blue,
      textAlign: 'center',
      borderRadius: 25,
    },

    navigationDisplay: {
      display: 'flex',
    },
    text: {
      color: colors.softwhite,
      fontSize: 16,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    navigationDisplayText: {
      color: colors.softwhite,
      fontSize: 20,
      paddingBottom: 5,
      marginTop: 15,
    },
    modal: {
      backgroundColor: colors.softwhite,
      margin: 15,
      width: '100%',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return styles;
};
