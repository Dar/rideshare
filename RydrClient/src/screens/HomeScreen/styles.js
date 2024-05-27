import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const screen_styles = StyleSheet.create({
  screenContainer: {
    heigh: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  tile: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelWrapper: {
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  panelContainer: {
    backgroundColor: colors.secondaryBlack,
    display: 'flex',
    flexDirection: 'column',
    amrginBottom: 10,
    borderRadius: 5,
  },

  bookButton: {
    position: 'relative',
    zIndex: 1000,
    flex: 2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.darkBlue,
  },

  scheduleButton: {
    flex: 1,
    backgroundColor: colors.lightblack,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-around',
    borderLeftWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  panelLeft: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    position: 'relative',
    borderWidth: 0,
    zIndex: 1000,
  },

  currLocation: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  spacer: {
    height: 20,
  },
  currLocationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.softwhite,
    marginBottom: 5,
  },
  currLocationText: {
    fontSize: 12,
    marginBottom: 5,
    color: colors.softwhite,
  },
  currLocationFav: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    paddingTop: 5,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkText,
    borderRadius: 50,
    marginBottom: 10,
  },
  pressableButton: {
    padding: 15,
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  pressableButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    color: colors.softwhite,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  mapSearch: {
    height: '100%',
    width: '100%',
  },

  rideTypeWrapper: {
    borderTopColor: colors.dark,
  },
  rideType: {
    paddingVertical: 10,
    alignItems: 'center',
  },

  rideTypeTitle: {
    paddingVertical: 10,
    color: colors.darkText,
    textAlign: 'center',
  },

  rideTypeConatainer: {
    display: 'flex',
    color: colors.darkText,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    borderTopColor: colors.dark,
    borderTopWidth: 1,
  },

  rideTypeText: {
    color: colors.darkText,
  },

  contentContainer: {
    alignItems: 'center',
    backgroundColor: colors.softwhite,
    borderColor: colors.lightblack,
  },

  bottomSheetWrapper: {
    backgroundColor: colors.softwhite,
    borderColor: colors.lightblack,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 1000,
  },

  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },

  sheduledBoxText: {
    fontSize: 16,
    color: colors.softwhite,
  },

  rideTypeImage: {
    marginTop: 5,
    height: 11,
    width: 25,
  },
  picker: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.darkBlue,
      borderRadius: 4,
      color: colors.softwhite,
      textAlign: 'center',
      width: '100%',
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: colors.darkBlue,
      borderRadius: 8,
      color: colors.softwhite,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    chevron: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
});

export default screen_styles;
