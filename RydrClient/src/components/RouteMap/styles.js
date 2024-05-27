import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  versionBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  versionText: {
    padding: 4,
    backgroundColor: '#FFF',
    color: '#000',
  },
  rideSummary: {
    backgroundColor: colors.secondaryBlack,
    padding: 10,
  },
  rideSummaryTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.lightblack,
    borderRadius: 10,
  },
  rideSummaryTextContainerText: {
    fontSize: 12,
    color: colors.darkText,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rideSummaryTextAddress: {},
  rideSummaryAddress: {
    width: '50%',
  },
  rideSummaryMetrics: {
    width: '50%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default component_styles;
