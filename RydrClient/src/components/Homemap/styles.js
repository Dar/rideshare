import {StyleSheet, Dimensions} from 'react-native';
import {colors, transparentColor} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  markerWrapOrigin: {
    width: 40,
    height: 20,
  },
  markerOrigin: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  destination: {
    width: 20,
    height: 20,
    backgroundColor: colors.secondaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },

  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 40,
    height: 40,
    top: 200,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: transparentColor.blue,
    position: 'absolute',
  },
  ring: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: transparentColor.green,
    borderWidth: 1,
    borderColor: transparentColor.green,
    opacity: 1,
  },
});

export default component_styles;
