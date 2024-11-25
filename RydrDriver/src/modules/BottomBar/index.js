import React, {useState, useMemo, useRef} from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../shared/common/styles';
import {useStyle} from './styles';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {
  clearMapState,
  getPlaceIdDetails,
} from '../../store/features/map/map-slice';
import {updateActiveDriver} from '../../store/features/driver/driver-slice';
import {
  clearOrderState,
  setOrder,
  setOrderState,
} from '../../store/features/order/order-slice';
import {clearOrdersState} from '../../store/features/order/orders-slice';
import CustomButton from '../../components/UI/CustomButton';
import IconButton from '../../components/UI/IconButton';
import SwitchButton from '../../components/SwitchButton';
import StatusBox from '../../components/StatusBox';

const BottomBar = ({
  tripDistance,
  showRiderPanel,
  handleLoadSettings,
  handleLoadTripItinerary,
}) => {
  const styles = useStyle();

  const dispatch = useAppDispatch();
  const [startRide, setStartRide] = useState(false);
  // get MAP
  const {distance, duration, distanceTravelled} = useAppSelector(
    state => state.mapState,
  );
  //get DRIVER
  const {data} = useAppSelector(state => state.driver);

  //get ORDERS
  const {ordersdata} = useAppSelector(state => state.ordersState);

  //get ORDER
  const {order} = useAppSelector(state => state.orderState);

  const renderBottomBar = () => {
    if (order && order?.status !== 'NEW' && data?.isActive) {
      return (
        <Pressable onPress={showRiderPanel} style={{alignItems: 'center'}}>
          <StatusBox />
        </Pressable>
      );
    } else {
      return <SwitchButton />;
    }
  };

  const buttonText = status => {
    switch (status) {
      case 'PICKING_UP_CLIENT':
        return 'Cancel Ride';
      case 'ARRIVED_FOR_PICKUP':
        return 'Start Trip';
      case 'STARTING_TRIP':
        return 'Starting Trip';
      case 'ARRIVED_AT_DESTINATION':
        return 'Complete Trip';
      default:
        return 'Complete Trip';
    }
  };

  const handleOrderState = () => {
    if (order?.status === 'ARRIVED_FOR_PICKUP') {
      const input = {
        id: order.id,
        status: 'STARTING_TRIP',
        driverId: data.id,
      };
      dispatch(setOrder(input))
        .unwrap()
        .then(() => {
          setStartRide(!startRide);
        })
        .catch(error => {
          console.error('Failed to update order:', error);
        });
    } else if (order?.status === 'ARRIVED_AT_DESTINATION') {
      const input = {
        id: order.id,
        status: 'COMPLETE_RIDE',
        driverId: data.id,
      };
      dispatch(setOrder(input))
        .unwrap()
        .then(() => {
          dispatch(clearOrderState());
          setStartRide(!startRide);
        })
        .catch(error => {
          console.error('Failed to complete order:', error);
        });
    }
  };

  return (
    <>
      <View style={styles.bottomBarPos}>
        <View style={styles.controls}>
          <Pressable style={styles.elevatedButton} onPress={handleLoadSettings}>
            <Ionicons name={'options'} size={30} color={colors.softwhite} />
          </Pressable>
          {renderBottomBar()}
          <Pressable
            style={styles.elevatedButton}
            onPress={handleLoadTripItinerary}>
            <Entypo name={'menu'} size={30} color={colors.softwhite} />
          </Pressable>
        </View>
        <View style={styles.contactPanel}>
          <View style={styles.riderInfo}>
            <IconButton
              size={32}
              iconName="phone"
              brand={'AntDesign'}
              isClickable={true}
              handler={() => console.log('Phone')}
              iconColor={colors.darkText}
            />
            <View
              style={{
                flex: 1,
                borderRightColor: colors.lightblack,
                borderRightWidth: 1,
                borderLeftColor: colors.lightblack,
                borderLeftWidth: 1,
                height: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkText,
                  textAlign: 'center',
                }}>
                {data?.given_name}
              </Text>
            </View>
            <IconButton
              size={32}
              iconName="user"
              brand={'AntDesign'}
              isClickable={true}
              handler={() => console.log('user')}
              iconColor={colors.darkText}
            />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <CustomButton
              bgColor={
                order?.status === 'STARTING_TRIP' ? colors.green : colors.red
              }
              fgColor={colors.softwhite}
              text={buttonText(order?.status)}
              onPress={handleOrderState}
              type="PRIMARY"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default BottomBar;
