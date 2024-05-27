import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';
const component_styles = StyleSheet.create({
  blockContainer: {
    padding: 10,
  },
  blockContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingVertical: 10,
  },
  row: {
    backgroundColor: colors.softwhite,
  },
  blockRow: {
    marginBottom: 20,
  },
  dateTextRow: {
    backgroundColor: colors.lightblack,
    padding: 10,
    borderRadius: 15,
  },
  dateText: {
    color: colors.softwhite,
    textAlign: 'center',
  },
});

export default component_styles;
