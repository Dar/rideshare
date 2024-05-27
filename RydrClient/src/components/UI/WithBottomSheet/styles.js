import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';
const bottomSheetStyles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.softwhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  bottomSheetWrapper: {
    backgroundColor: colors.softwhite,
    borderColor: colors.lightblack,
  },
  closeButtonContainer: {
    position: 'static',
    width: '100%',
    left: '90%',
    top: 10,
    zIndex: 1000000,
  },

  contentContainer: {
    backgroundColor: colors.softwhite,
    borderColor: colors.lightblack,
  },
});

export default bottomSheetStyles;
