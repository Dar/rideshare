import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';
const component_styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 1,
  },
  iconContainer: {
    backgroundColor: colors.softwhite,
    padding: 5,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 16,
    color: colors.darkText,
  },
  recentContainer: {
    paddingVertical: 10,
    marginTop: 0,
    display: 'flex',
  },
  recentList: {
    marginTop: 0,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkText,
    textAlign: 'left',
  },
  secondaryExpandableToggle: {
    display: 'flex',
    flexDirection: 'row',
    alighItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    height: 40,
  },
});

export default component_styles;
