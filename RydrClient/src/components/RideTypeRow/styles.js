import {StyleSheet} from 'react-native';
import {colors} from '../../shared/common/styles/';

const component_styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: 'contain',
  },
  block: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  type: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    color: colors.darkText,
  },

  typeItem: {
    backgroundColor: colors.darkBlue,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  time: {
    color: colors.darkText,
  },
  rightBock: {
    width: 100,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
    color: colors.darkText,
  },
});

export default component_styles;
