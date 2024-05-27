import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';

const component_styles = StyleSheet.create({
  pageHeaderContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
  },
  pagetitle: {
    color: colors.softwhite,
    fontSize: 32,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default component_styles;
