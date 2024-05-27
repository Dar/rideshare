import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles';

export const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 30,
    padding: 10,
    borderRadius: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  bottomText: {
    fontSize: 16,
    color: colors.softwhite,
  },
  bottomBarContent: {
    color: 'white',
    marginVertical: 5,
  },
  timerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    width: 100,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
