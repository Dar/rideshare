import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import {Switch} from 'react-native-switch';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../shared/common/styles';
import {useStyle} from './styles';

import {useAppDispatch} from '../../store/app/hooks';
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
import CustomButton from '../UI/CustomButton';
import IconButton from '../UI/IconButton';

const BottomBarContentControls = ({
  order,
  data,
  distance,
  duration,
  animatedPanel,
  tripDistance,
}) => {
  const styles = useStyle();
  const dispatch = useAppDispatch();
  const [startRide, setStartRide] = useState(false);

  const toggleActive = () => {
    const input = {
      type: 'Standard',
      isActive: !data?.isActive,
    };
    dispatch(updateActiveDriver(input));
  };

  const renderBottomBar = () => {
    if (order && order?.status !== 'NEW' && data?.isActive) {
      return (
        <Pressable onPress={animatedPanel} style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.bottomText}>
              {duration ? duration.toFixed(1) : 0} min
            </Text>
            <View
              style={{
                backgroundColor: colors.darkBlue,
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text style={styles.bottomText}>
              {distance ? distance.toFixed(1) : 0} km
            </Text>
          </View>

          <Text style={styles.bottomText}>
            {order?.status === 'PICKING_UP_CLIENT' &&
              `Picking up ${order?.user?.given_name}`}
            {order?.status === 'ARRIVED_FOR_PICKUP' && `Arrived At`}
            {order?.status === 'STARTING_TRIP' && `Starting Ride`}
            {order?.status === 'ARRIVED_AT_DESTINATION' &&
              tripDistance < 50 &&
              `Arrived At Destination Bitch`}
          </Text>
          {/* <Text style={styles.bottomBarContent}>
            Distance Travelled: {parseFloat(distanceTravelled).toFixed(2)} km
          </Text> */}
        </Pressable>
      );
    } else {
      return (
        <Switch
          value={data?.isActive}
          onValueChange={() => toggleActive()}
          disabled={false}
          activeText={'Active'}
          inActiveText={'Offline'}
          circleSize={50}
          barHeight={50}
          circleBorderWidth={1}
          backgroundActive={colors.green}
          backgroundInactive={colors.red}
          circleActiveColor={colors.softwhite}
          circleInActiveColor={colors.softwhite}
          changeValueImmediately={true}
          innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
          outerCircleStyle={{}}
          renderActiveText={true}
          renderInActiveText={true}
          switchLeftPx={3}
          switchRightPx={3}
          switchWidthMultiplier={2.5}
          activeTextStyle={{fontSize: 20}}
          inactiveTextStyle={{fontSize: 20}}
          switchBorderRadius={25}
        />
      );
    }
  };

  return (
    <View style={styles.bottomBarWrapper}>
      <View style={styles.bottomBarPos}>
        <View style={styles.controls}>
          <Pressable
            style={styles.elevatedButton}
            onPress={() => {
              handlePresentModalPress();
            }}>
            <Ionicons name={'options'} size={30} color={colors.softwhite} />
          </Pressable>
          {renderBottomBar()}
          <Pressable
            style={styles.elevatedButton}
            onPress={() => {
              dispatch(clearMapState());
              dispatch(clearOrderState());
              dispatch(clearOrdersState());
            }}>
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
              bgColor={startRide ? colors.red : colors.green}
              fgColor={colors.softwhite}
              text={startRide ? 'Stop Ride ' : 'Start Ride'}
              onPress={() => {
                dispatch(setOrderState('STARTING_TRIP'));
                setStartRide(!startRide);
              }}
              type="PRIMARY"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomBarContentControls;
