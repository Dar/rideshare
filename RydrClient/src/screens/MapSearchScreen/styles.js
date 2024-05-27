import {StyleSheet, Dimensions} from 'react-native';
import {colors, transparentColor} from '../../shared/common/styles/';

const DEVICE_WIDTH = Dimensions.get('window').width;

const screen_styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    zIndex: 100,
    backgroundColor: colors.softwhite,
    flex: 1,
    paddingHorizontal: 10,
  },
  wrapper: {
    padding: 0,
    marginTop: 0,
    position: 'relative',
    flex: 1,
  },

  searchFieldsContainer: {
    marginVertical: 20,
    height: '15%',
    position: 'relative',
    zIndex: 100,
  },
  bottomContainer: {
    padding: 10,
  },

  textInput: {
    padding: 10,
    backgroundColor: colors.softwhite,
    marginVertical: 5,
    marginLeft: 20,
    color: colors.lightblack,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    borderRadius: 5,
  },

  listView: {
    position: 'absolute',
    backgroundColor: colors.softwhite,
    top: 105,
    color: colors.darkText,
  },

  placeholderText: {
    color: colors.darkText,
  },

  autocompleteContainer: {
    position: 'absolute',
    color: colors.darkText,
    top: 0,
    left: 10,
    right: 10,
  },

  textInputContainer: {
    borderRadius: 5,
  },

  circle: {
    width: 5,
    height: 5,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    top: 20,
    left: 15,
    borderRadius: 5,
  },

  line: {
    width: 1,
    height: 50,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    top: 28,
    left: 17,
  },

  square: {
    width: 5,
    height: 5,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    top: 80,
    left: 15,
  },

  roundButton: {
    position: 'relative',
    paddingVertical: 10,
    zIndex: 100,
  },

  bottomSheetContainer: {
    paddingLeft: 30,
    paddingRight: 20,
    marginTop: 20,
  },

  scrollView: {
    height: 100,
  },

  primaryExpandableToggleText: {
    color: colors.secondaryBlack,
    fontSize: 20,
    fontWeight: 'bold',
  },
  noResults: {
    alignContent: 'center',

    paddingHorizontal: 10,
    paddingVertical: 15,
    width: DEVICE_WIDTH - 30,
    justifyContent: 'center',
    borderRadius: 5,
  },
  noResultsText: {
    borderWidth: 1,
    borderColor: colors.black,
    textAlign: 'center',
    backgroundColor: transparentColor.black,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: colors.softwhite,
  },
});
export default screen_styles;
