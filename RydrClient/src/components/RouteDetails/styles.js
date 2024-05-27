import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  rideSummary: {
    padding: 10,
  },
  rideSummaryTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  rideSummaryTextHeader: {
    fontSize: 22,
    color: colors.darkText,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  rideSummaryTextBody: {
    fontSize: 18,
    color: colors.darkText,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  rideSummaryTextAddress: {},
  rideSummaryAddress: {
    width: '50%',
  },
  rideSummaryMetrics: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: colors.softwhite,
    borderBottomWidth: 1,
    borderTopColor: colors.softwhite,
    borderTopWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
});

export default component_styles;
