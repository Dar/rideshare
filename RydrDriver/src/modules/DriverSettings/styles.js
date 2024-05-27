import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles';

export const useStyle = () => {
  const {width, height} = Dimensions.get('window');

  const styles = StyleSheet.create({});
  return styles;
};
