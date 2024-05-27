import {StyleSheet} from 'react-native';
import {colors, transparentColor} from '../../shared/common/styles';

const componentStyles = StyleSheet.create({
  root: {
    paddingHorizontal: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
  },

  minutes: {
    color: colors.lightblack,
    fontSize: 22,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.lightblack,
  },
  distance: {
    color: colors.lightblack,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.lightblack,
  },

  orderDetailFooter: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  tripType: {
    color: colors.softwhite,
    fontSize: 16,
    marginHorizontal: 10,
  },
  orderText: {
    color: colors.lightblack,
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'column',
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 1,
  },

  tripdetails: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  faredetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    left: '40%',
    paddingVertical: 10,
  },

  orderSubText: {
    fontSize: 12,
    color: colors.lightblack,
    textAlign: 'center',
  },

  orderTimeDist: {
    alignItems: 'center',
    position: 'relative',
    paddingRight: 10,
  },

  orderDetailFooterCost: {
    margin: 0,
  },

  popupContainer: {
    width: '100%',
    backgroundColor: colors.grey,
  },

  border: {
    height: 72,
    position: 'absolute',
    right: -10,
    width: 2,
    backgroundColor: colors.darkBlue,
    shadowColor: colors.lightblack,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  timerText: {
    color: colors.softwhite,
    fontWeight: '400',
    fontSize: 32,
  },

  acceptButton: {
    backgroundColor: colors.darkGreen,
    height: 75,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  acceptText: {
    color: colors.softwhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
  declineButton: {
    backgroundColor: colors.darkRed,
    height: 75,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  declineText: {
    color: colors.softwhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowDetails: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  rowBlock: {
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
    width: '100%',
  },
  rideType: {
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: colors.darkBlue,
    paddingVertical: 10,
    alignContent: 'flex-start',
  },
  buttonContainerTop: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  buttonContainerBottom: {
    paddingHorizontal: 0,
    width: '50%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cost: {
    fontSize: 46,
    fontWeight: 'bold',
    marginLeft: 2.5,
    color: colors.lightblack,
  },
  topbanner: {
    display: 'flex',
    backgroundColor: colors.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileName: {
    color: colors.lightblack,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  passenger: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    right: '40%',
  },
});

export default componentStyles;
