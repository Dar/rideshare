import {Dimensions, StyleSheet} from 'react-native';

export const useStyle = () => {
  const {width, height} = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: width,
    },
  });
  return styles;
};
