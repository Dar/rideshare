import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const screen_styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  goSearchButtonContainer: {
    paddingHorizontal: 10,
    marginTop: 25,
  },

  tripDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
