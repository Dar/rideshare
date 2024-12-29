import {StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';


const rideDetailBottomSheet = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  driverProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  carDetails: {
    fontSize: 14,
    color: colors.gray,
  },
  tripSummary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.lightgray,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusSection: {
    marginTop: 20,
  },
  timeEstimate: {
    fontSize: 16,
    color: colors.darkBlue,
    marginBottom: 10,
  },
  statusMessage: {
    fontSize: 14,
    color: colors.gray,
  },
});

export default rideDetailBottomSheet;
