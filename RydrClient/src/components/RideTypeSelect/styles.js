import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.softwhite,
    justifyContent: 'space-between',
    borderBottomColor: colors.darkText,
    borderBottomWidth: 1,
    marginBottom: 0,
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: colors.darkText,
  },

  text: {
    color: colors.darkText,
    fontSize: 18,
    textAlign: 'center',
  },
  distanceText: {
    color: colors.darkText,
    fontSize: 16,
    textAlign: 'center',
  },

  toggleOptions: {
    left: 10,
    marginRight: 10,
  },

  typeItem: {
    backgroundColor: colors.darkBlue,
    padding: 10,
    alignItems: 'center',
  },

  time: {
    color: colors.darkText,
  },

  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.softwhite,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: colors.black,
    height: 400,
    justifyContent: 'flex-start',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    marginVertical: 20,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: colors.softwhite,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  fareText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.darkText,
    fontSize: 22,
  },
});

export default component_styles;
