import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const screen_styles = StyleSheet.create({
  panelContainer: {
    paddingVertical: 0,
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },

  orderSummaryContainer: {
    position: 'absolute',
    backgroundColor: colors.softwhite,
    width: '100%',
    height: '100%',
    elevation: 5,
    zIndex: 2,
    justifyContent: 'space-between',
  },

  orderSummaryStatus: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.softwhite,
    borderRadius: 0,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    borderTopColor: colors.darkText,
  },

  orderSummaryConfirm: {
    backgroundColor: colors.softwhite,
    position: 'relative',
    bottom: 0,
    width: '100%',
    zIndex: 2,
    elevations: 5,
    borderRadius: 0,
  },

  orderSummaryLocationDetails: {
    position: 'relative',
    height: 100,
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    borderRadius: 0,
  },
  orderDetailsItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    width: 80,
    height: 40,
    color: colors.softwhite,
    backgroundColor: colors.softwhite,
  },

  orderSummaryRideDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDetailsGridItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderSummaryLocationNames: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  orderSummaryTextContainer: {
    color: colors.softwhite,
    fontSize: 16,
    textAlign: 'left',
    display: 'flex',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },

  orderSummaryText: {
    color: colors.darkText,
    fontSize: 18,
    textAlign: 'left',
  },
  driverText: {
    color: colors.darkText,
    fontSize: 16,
  },

  orderSummaryCancelButton: {
    marginVertical: 5,
    width: '100%',
  },

  orderSummaryButtonText: {
    color: colors.darkText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: colors.softwhite,
    right: 15,
    borderRadius: 0,
    padding: 10,
  },
  orderSummaryCancelButtonText: {
    color: colors.darkText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: colors.lightblack,
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  orderSummaryButton: {
    backgroundColor: colors.darkBlue,
    marginVertical: 5,
    width: '100%',
  },

  circle: {
    width: 5,
    height: 5,
    backgroundColor: colors.darkText,
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 45,
    backgroundColor: colors.darkText,
    position: 'absolute',
    top: 20,
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: colors.darkText,
    position: 'absolute',
    top: 60,
    left: 15,
  },
  orderSummaryImage: {
    width: 50,
    height: 50,
  },
  driverDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  driverContact: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.darkBlue,
    backgroundColor: colors.darkBlue,
    paddingVertical: 10,
    width: '50%',
  },
  headerBox: {
    position: 'relative',
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timeboxText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.softwhite,
    position: 'absolute',
    left: 100,
  },
  expandButton: {
    borderLeftWidth: 1,
    borderLeftColor: colors.softwhite,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  expandIcon: {
    left: 15,
    position: 'relative',
  },
  closeButtonContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 20,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: colors.softwhite,
    position: 'absolute',
    borderColor: colors.darkBlue,
    width: '100%',
    height: 100,
    elevation: 15,
    top: 0,
    zIndex: 1,
  },
  bottomSheetHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    color: colors.softwhite,
    borderRadius: 5,
    backgroundColor: colors.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
  },
});

export default screen_styles;
