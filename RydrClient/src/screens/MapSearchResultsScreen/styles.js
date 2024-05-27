import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const screen_styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },

  goSearchButtonContainer: {
    paddingHorizontal: 10,
  },

  goSearchButton: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: colors.darkBlue,
    borderRadius: 5,
    zIndex: 1000,
    width: '100%',
    position: 'absolute',
    top: 20,
  },

  goSearchButtonText: {
    fontSize: 16,
  },
});

export default screen_styles;
