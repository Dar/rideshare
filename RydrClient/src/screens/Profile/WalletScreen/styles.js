import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles/';

const screen_styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.softwhite,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 10,
  },
  expanedPanel: {
    paddingVertical: 20,
  },
  tileTitle: {
    color: colors.darkText,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formTitle: {
    color: colors.darkText,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tileText: {
    color: colors.darkText,
    fontSize: 12,
  },
  tileLargeText: {
    color: colors.darkText,
    fontSize: 40,
  },
  autoFillContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  blockLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockLayoutInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 25,
  },
  inputIcon: {
    marginRight: 10,
  },
  formFields: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  formFooter: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'space-around',
    justifyContent: 'space-around',
  },
});

export default screen_styles;
