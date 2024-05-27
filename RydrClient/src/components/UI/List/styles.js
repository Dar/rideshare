import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';

const component_styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },

  dateInfo: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },

  dateInfoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  time: {
    color: colors.darkText,
  },
  rightContainer: {
    width: 100,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default component_styles;
