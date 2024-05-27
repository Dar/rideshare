import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles';

export const useStyle = () => {
  const {width, height} = Dimensions.get('window');

  const styles = StyleSheet.create({
    bottomBarWrapper: {
      width: '100%',
      position: 'relative',
    },
    bottomBarPos: {
      width: '100%',
      height: 100,
      position: 'relative',
      bottom: 0,
      zIndex: 1000,
    },

    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      height: 100,
      backgroundColor: colors.darkBlue,
    },
    bottomText: {
      fontSize: 16,
      color: colors.softwhite,
    },
    bottomBarContent: {
      color: 'white',
      marginVertical: 5,
      backgroundColor: colors.darkBlue,
    },
    elevatedButton: {
      zIndex: 100,
    },
    contactPanel: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.softwhite,
      justifyContent: 'space-between',
    },

    riderInfo: {
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: colors.softwhite,
    },
  });
  return styles;
};
