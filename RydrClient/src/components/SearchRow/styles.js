import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../shared/common/styles/';

const screen_styles = StyleSheet.create({
  autoCompleteListContainer: {
    backgroundColor: colors.softwhite,
    paddingLeft: 0,
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    backgroundColor: colors.softwhite,
    paddingHorizontal: 0,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    paddingVertical: 10,
  },

  iconContainer: {
    backgroundColor: colors.darkBlue,
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },

  locationText: {
    color: colors.darkText,
    fontSize: 12,
  },
  address: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  location: {
    fontSize: 12,
    color: colors.darkText,
  },
});

export default screen_styles;
