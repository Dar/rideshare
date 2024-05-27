import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles';

export const useStyle = () => {
  const {width, height} = Dimensions.get('window');

  const styles = StyleSheet.create({
    bottomBarWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 100,
      backgroundColor: colors.softwhite,
    },
    bottomBarPos: {
      width: '100%',
      bottom: 0,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors.darkBlue,
      height: 100,
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
