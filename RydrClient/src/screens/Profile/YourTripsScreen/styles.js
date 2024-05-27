import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';

const screen_styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },

  item: {
    marginBottom: 15,
  },
  title: {
    color: colors.darkText,
    lineHeight: 20,
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: colors.softwhite,
  },
  tripDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 180,
    backgroundColor: colors.softwhite,
  },
  tripHeader: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tripHistoryContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
  },

  tripHistoryStatus: {
    display: 'flex',
    flexDirection: 'column',
  },

  tripHistoryLocationDetails: {
    position: 'relative',
    width: '100%',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.darkBlue,
  },

  tripHistoryLocationNames: {
    marginLeft: 20,
    height: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  tripHistoryText: {
    color: colors.softwhite,
    fontSize: 12,
    textAlign: 'left',
  },
  tripHistoryFooter: {
    paddingVertical: 10,
    alignItems: 'flex-end',
    right: 10,
    width: '100%',
  },
  tripHistoryFooterButton: {
    backgroundColor: colors.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  tripHistoryFooterButtonText: {
    color: colors.softwhite,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: colors.softwhite,
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 35,
    backgroundColor: colors.softwhite,
    position: 'absolute',
    top: 20,
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: colors.softwhite,
    position: 'absolute',
    top: 55,
    left: 15,
  },
});

export default screen_styles;
