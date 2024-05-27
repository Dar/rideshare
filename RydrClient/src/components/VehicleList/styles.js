import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  rideTypeWarpper: {
    borderTopColor: colors.dark,
  },
  rideType: {
    paddingVertical: 10,
    alignItems: 'center',
  },

  rideTypeConatainer: {
    display: 'flex',
    color: colors.darkText,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
  },

  rideTypeText: {
    color: colors.darkText,
  },
  rideTypeImage: {
    marginTop: 5,
    height: 11,
    width: 25,
  },
});

export default component_styles;
