import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles';

export const useStyle = () => {
  const {width, height} = Dimensions.get('window');
  const styles = StyleSheet.create({
    navigationContainer: {
      position: 'absolute',
      paddingBottom: 10,
      backgroundColor: 'black',
      top: 0,
      zIndex: 100,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    navigationText: {
      paddingVertical: 5,
      display: 'flex',
      flexDirection: 'row',
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: colors.grey,
      borderTopWidth: 1,
    },
    directionalIconContainer: {
      color: colors.softwhite,
      alignContent: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '30%',
      margin: 0,
      paddingHorizontal: 10,
      borderRightWidth: 1,
      borderRightColor: colors.grey,
    },
    directionalIcon: {
      color: colors.softwhite,
      fontSize: 22,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      marginVertical: 15,
    },
    directionalDistance: {
      color: colors.softwhite,
      fontSize: 22,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 'bold',
    },

    htmlContainer: {
      width: '70%',
      paddingHorizontal: 0,
      height: '100%',
    },
  });
  return styles;
};
