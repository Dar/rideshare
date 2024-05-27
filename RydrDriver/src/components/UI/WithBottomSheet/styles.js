import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';
const bottomSheetStyles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.softwhite,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
  },
  bottomSheetWrapper: {
    backgroundColor: colors.themeColor,
    borderColor: colors.lightblack,
  },
  bottomSheetHandleStyle: {
    backgroundColor: colors.darkText,
  },
  bottomSheetBackgroundStyle: {
    backgroundColor: colors.softwhite,
  },
  closeButtonContainer: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 10,
    zIndex: 1000,
  },
  contentContainer: {
    backgroundColor: colors.themeColor,
    borderColor: colors.lightblack,
  },
});

export default bottomSheetStyles;
