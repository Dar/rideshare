import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  rideDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.softwhite,
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 1,
  },

  rideDetailsContainerBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    width: '50%',
  },

  rideDetailsContainerText: {
    color: colors.darkBlue,
    alignItems: 'center',
  },

  rideDetailsText: {
    color: colors.darkText,
    fontSize: 16,
    width: '100%',
  },

  pickercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    inputIOS: {
      fontSize: 18,
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.darkBlue,
      borderRadius: 4,
      color: colors.darkText,
      textAlign: 'center',
      width: '100%',
    },
    placeholder: {
      color: colors.darkText,
      fontSize: 18,
    },
    inputAndroidContainer: {
      margin: 0,
    },
    inputAndroid: {
      fontSize: 18,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderWidth: 0.5,
      borderColor: colors.darkBlue,
      borderRadius: 8,
      color: colors.darkText,
      textAlign: 'center',
      width: '100%',
      margin: 0,
    },
  },
  picker_no_border: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 5,
      color: colors.darkText,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    },
    placeholder: {
      color: colors.darkText,
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 8,
      borderRadius: 8,
      color: colors.darkText,
      paddingRight: 30,
    },
  },
});

export default component_styles;
