import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import componentStyles from './styles.js';
import BoxContainer from '../UI/BoxContainer/';
import {colors} from '../../shared/common/styles/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TripDestinationDetails from '../UI/TripDestinationDetails/index.js';
import {useAppSelector, useAppDispatch} from '../../store/app/hooks';
import {updateOrderList} from '../../store/features/order/orders-slice';
import CountdownTimer from '../UI/CountdownTimer/CountdownTimer.js';
import {Easing} from 'react-native-reanimated';
import imagePath from '../../shared/common/imagePath.js';

const NewOrderPopup = ({
  newOrder,
  onAccept,
  onDecline,
  activateCard,
  duration,
  distance,
  passenger,
  resetKey,
  order,
}) => {
  const dispatch = useAppDispatch();

  const {width, height} = useWindowDimensions();
  const {ordersdata} = useAppSelector(state => state.ordersState);
  const handleTimerComplete = () => {
    if (ordersdata.length) {
      dispatch(updateOrderList(ordersdata));
    }
  };

  const toggleBottomSheet = value => {
    Animated.timing(translateY, {
      toValue: expanded ? value : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const expandBox = async pos => {
    toggleBottomSheet(pos);
  };

  useEffect(() => {
    if (ordersdata.length) {
      toggleBottomSheet(0);
    }
  }, [ordersdata]);

  const [expanded, setExpanded] = useState(false);
  const translateY = useState(new Animated.Value(height))[0];

  return (
    <View style={componentStyles.root}>
      <View style={componentStyles.buttonContainerTop}>
        <CountdownTimer
          key={resetKey}
          duration={10}
          onSlice={handleTimerComplete}
        />
      </View>
      <Animated.View
        style={[componentStyles.popupContainer, {transform: [{translateY}]}]}>
        <View style={componentStyles.topbanner}>
          <View style={componentStyles.tripdetails}>
            <View style={componentStyles.faredetails}>
              <FontAwesome name={'dollar'} size={24} color={colors.lightdark} />
              <Text style={componentStyles.cost}>{ordersdata[0].fare}</Text>
            </View>
          </View>
          <View style={componentStyles.row}>
            {newOrder?.user?.rating ? (
              <Text style={componentStyles.tripType}>
                <AntDesign name={'star'} size={18} />
                {newOrder?.user?.rating}
              </Text>
            ) : null}
          </View>
          <View style={componentStyles.passenger}>
            <MaterialCommunityIcons
              name={'seat-passenger'}
              size={32}
              color={colors.darkBlue}
            />
            <Text style={componentStyles.profileName}>
              {ordersdata[0].passengerNumber}
            </Text>
          </View>
        </View>
        <TripDestinationDetails />

        {/* <View style={componentStyles.rideType}>
          <Ionicons name={'car'} size={18} color={colors.softwhite} />
          <Text style={componentStyles.tripType}>{newOrder?.type}</Text>
        </View> */}
        <View style={componentStyles.buttonContainer}>
          <View style={componentStyles.buttonContainerBottom}>
            <Pressable onPress={onAccept} style={componentStyles.acceptButton}>
              <Text style={componentStyles.acceptText}>Accept</Text>
            </Pressable>
          </View>
          <View style={componentStyles.buttonContainerBottom}>
            <Pressable
              onPress={onDecline}
              style={componentStyles.declineButton}>
              <Text style={componentStyles.declineText}>Reject</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default NewOrderPopup;
