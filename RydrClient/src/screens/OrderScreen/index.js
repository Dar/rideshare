import React, {useEffect, useCallback, useState, useMemo} from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  Pressable,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute, useNavigation} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import OrderMap from '../../components/OrderMap';
import BoxContainer from '../../components/UI/BoxContainer';
import BoxItem from '../../components/UI/BoxItem';
import {colors} from '../../shared/common/styles/';
import imagePath from '../../shared/common/imagePath';
import screen_styles from './styles';
import RouteDetails from '../../components/RouteDetails';
import {useAppSelector, useAppDispatch} from '../../store/app/hooks';
import {Easing} from 'react-native-reanimated';
import {
  fetchOrder,
  setOrder,
  updateActiveOrder,
  setOrderActive,
  setOrderState,
  clearOrderState
} from '../../store/features/order/order-slice';
import {clearDriverState} from '../../store/features/drivers/driver-slice';
import { calculateDistance, proximityThreshold } from '../../constants/index.js';

import {
  getCar,
  setCar,
  driverSubscriptionUpdate,
  updateMovement,
  updateDriverLocation
} from '../../store/features/drivers/driver-slice';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

import RippleButton from '../../components/UI/RippleButton';
import {AlertWithCallback} from '../../components/UI/Alert';
import {onDriverUpdated, onOrderUpdated} from '../../graphql/subscriptions';
import {setMapViewBoundariesForCoords,clearMapState, setRouteNavigation} from '../../store/features/map/map-slice';
import {useFocusEffect} from '@react-navigation/native';

const OrderScreen = props => {
  useKeepAwake();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const deltaValue = 0.0122;
  const {height, width} = useWindowDimensions();
  const aspectRatio = (width / height) * deltaValue;
  const [animationText, setAnimationText] = useState('Searching for driver');
  const [expanded, setExpanded] = useState(false);
  const [confirm, setConfirmed] = useState(false);
  const translateY = useState(new Animated.Value(height - 200))[0];
  const {
    originAddress,
    destinationAddress,
    origin,
    destination,
    latitudeDelta,
    longitudeDelta,
    routeCoordinates,
    tripCoordinates
  } = useAppSelector(state => state.mapState);
  const {car} = useAppSelector(state => state.driver);
  const {order, isOrderActive} = useAppSelector(state => state.orderState);
  const [isVisible, setIsVisible] = useState(false);


  const tripDistance = useMemo(() => {
    let distance = 50;
    if (car?.currentLat && car?.currentLng) {
      switch (order?.status) {
        case 'PICKING_UP_CLIENT':
          distance = calculateDistance(
            {
              latitude: car?.currentLat,
              longitude: car?.currentLng,
            },
            {
              latitude: origin?.geometry?.location?.lat,
              longitude: origin?.geometry?.location?.lng,
            },
          );
          break;
        case 'STARTING_TRIP':
        case 'ARRIVED_AT_DESTINATION':
          distance = calculateDistance(
            {
              latitude: car?.currentLat,
              longitude: car?.currentLng,
            },
            {
              latitude: destination?.geometry?.location?.lat,
              longitude: destination?.geometry?.location?.lng,
            },
          );
          break;
        default:
          distance = 50;
      }
    }
    return distance;
  }, [car?.currentLat, car?.currentLng, order?.status, origin, destination]);

  useEffect(() => {
    if (order?.status === 'PICKING_UP_CLIENT') {

      if (tripDistance <= proximityThreshold) {
        dispatch(setOrderState('ARRIVED_FOR_PICKUP'));
        const input = {
          id: order.id,
          status: 'ARRIVED_FOR_PICKUP',
          driverId: car?.id,
        };
        dispatch(setOrder(input));
      }
    }
    if (order?.status === 'STARTING_TRIP') {

      if (tripDistance <= proximityThreshold) {
        dispatch(setOrderState('ARRIVED_AT_DESTINATION'));
        const input = {
          id: order.id,
          status: 'ARRIVED_AT_DESTINATION',
          driverId: car.id,
        };
        dispatch(setOrder(input));
      }
    }
  }, [tripDistance, order?.status]);


  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      return () => {
        setIsVisible(false);
      };
    }, []),
  );
  const toggleBottomSheet = value => {
    Animated.timing(translateY, {
      toValue: expanded ? value : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setExpanded(!expanded);
  };

  const positionBottomSheet = value => {
    Animated.timing(translateY, {
      toValue: value,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let interval;
    
    if (!order?.driverId) {
      interval = setInterval(() => {
        setAnimationText(prevText => {
          if (prevText === 'Searching for driver')
            return 'Searching for driver.';
          else if (prevText === 'Searching for driver.')
            return 'Searching for driver..';
          else if (prevText === 'Searching for driver..')
            return 'Searching for driver...';
          else return 'Searching for driver';
        });
      }, 500);
    } else {
      dispatch(getCar(order?.driverId));
      positionBottomSheet(height - 280);
    }

    return () => clearInterval(interval);
  }, [order?.driverId]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (route.params?.id) {
        dispatch(fetchOrder(route.params.id));
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let subscription;
    if (!order) {
      return;
    } else {
      subscription = API.graphql(
        graphqlOperation(onOrderUpdated, {id: order?.id}),
      ).subscribe({
        next: ({value}) => {
          const updatedOrder = value.data.onOrderUpdated;
          if (updatedOrder) {
            dispatch(
              setOrder({
                id: order?.id,
                ...updatedOrder,
              }),
            );
          }
        },
        error: error => console.warn(JSON.stringify(error)),
      });
    }
    return () => subscription.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (!order?.status || !car?.currentLat || !car?.currentLng) return;
  
    const getBoundaries = () => {
      if (order.status === 'PICKING_UP_CLIENT') {
        return [
          { latitude: car.currentLat, longitude: car.currentLng },
          { latitude: origin?.details?.geometry?.location?.lat, longitude: origin?.details?.geometry?.location?.lng },
        ];
      }
  
      if (order.status === 'STARTING_TRIP') {
        return [
          { latitude: origin?.details?.geometry?.location?.lat, longitude: origin?.details?.geometry?.location?.lng },
          { latitude: destination?.details?.geometry?.location?.lat, longitude: destination?.details?.geometry?.location?.lng },
        ];
      }
  
      return [
        { latitude: origin?.details?.geometry?.location?.lat, longitude: origin?.details?.geometry?.location?.lng },
        { latitude: destination?.details?.geometry?.location?.lat, longitude: destination?.details?.geometry?.location?.lng },
      ];
    };
  
    const boundaries = getBoundaries();
    if (boundaries) {
      dispatch(setMapViewBoundariesForCoords(boundaries));
    }
  }, [order?.status, car?.currentLat, car?.currentLng, origin, destination]);
  

  const cancelOrder = () => {
    return AlertWithCallback(
      'Cancel',
      'Are you sure you want to cancel this order?',
      () => {
        setConfirmed(true);
      },
    );
  };

  useEffect(() => {
    let mounted = true;
    if (confirm && mounted) {
      dispatch(updateActiveOrder({id: order?.id, status: 'CANCELLED'}));
      dispatch(setOrderActive(false));
      dispatch(clearMapState());
      dispatch(clearDriverState());
      dispatch(clearOrderState());
      navigation.navigate('Home');
    }

    return () => {
      setConfirmed(false);
      mounted = false;
    };
  }, [confirm]);

  const expandBox = async () => {
    setExpanded(!expanded);
    toggleBottomSheet(height - 280);
  };

  const [showBox, setShowBox] = useState(false);

  const showInfoBox = () => {
    setShowBox(!showBox);
  };


  // ******************** RUN TRIP SIMULATOR
  // **************************************** 
  // **************************************** 

  // useEffect(() => {
  //   if (order?.status === 'PICKING_UP_CLIENT') {
  //     const interval = setInterval(() => {
  //       dispatch(updateDriverLocation(routeCoordinates[0]?.end_location));
  //       dispatch(setRouteNavigation(routeCoordinates.slice(1)));
  //     }, 1000);

  //     if (!routeCoordinates.length) {
  //       clearInterval(interval);
  //     }

  //     return () => clearInterval(interval);
  //   } else if (order?.status === 'STARTING_TRIP') {
  //     const interval = setInterval(() => {
  //       dispatch(updateDriverLocation(routeCoordinates[0]?.end_location));
  //       dispatch(setRouteNavigation(routeCoordinates.slice(1)));
  //     }, 1000);

  //     if (!routeCoordinates.length) {
  //       clearInterval(interval);
  //     }

  //     return () => clearInterval(interval);
  //   }
  // }, [routeCoordinates.length, order?.status]);

  // ******************** END RUN TRIP SIMULATOR
  // **************************************** 
  // **************************************** 

  return (
    <>
      {isVisible && (
        <View class={screen_styles.panelContainer}>
          {showBox ? (
            <View
              style={{
                backgroundColor: colors.black,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: 100,
              }}>
              <Text style={{color: colors.softwhite}}>
                Car Lat: {car?.currentLat ? car?.currentLat : 0}
              </Text>
              <Text style={{color: colors.softwhite}}>
                Car Lng: {car?.currentLng ? car?.currentLng : 0}
              </Text>
              <Text style={{color: colors.softwhite}}>
                Heading: {car?.heading ? car?.heading : 0}
              </Text>
            </View>
          ) : null}
          <Animated.View
            style={{
              position: 'relative',
              zIndex: 0,
              width: '100%',
            }}>
            <OrderMap car={car} origin={origin} destination={destination} />
          </Animated.View>

          <Animated.View
            style={[
              screen_styles.orderSummaryContainer,
              {transform: [{translateY}, {perspective: 1000}]},
            ]}>
            {!order?.driverId ? (
              <View style={screen_styles.headerBox}>
                <Pressable
                  style={{left: 10, position: 'absolute'}}
                  onPress={showInfoBox}>
                  <MaterialCommunityIcons
                    name="album"
                    color={colors.white}
                    size={32}
                  />
                </Pressable>
                <Text style={screen_styles.timeboxText}>{animationText}</Text>
                <RippleButton
                  style={screen_styles.orderSummaryButtonText}
                  onPress={cancelOrder}
                  comp={
                    <MaterialCommunityIcons
                      name="cancel"
                      color={colors.red}
                      size={32}
                    />
                  }
                />
              </View>
            ) : null}
            <BoxContainer style={screen_styles.orderSummaryStatus} col={'full'}>
              <BoxItem style={screen_styles.orderDetailsItem}>
                <Image
                  style={screen_styles.orderSummaryImage}
                  source={imagePath.profile}
                />
                <View>
                  <Text style={screen_styles.orderSummaryText}>
                    {car ? `${car.given_name} ${car.family_name}` : null}
                  </Text>
                  <View style={screen_styles.driverDetails}>
                    <Text style={screen_styles.driverText}>
                      {order?.status === 'PICKING_UP_CLIENT'
                        ? 'Honda Civic BNXM-571'
                        : ''}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => expandBox()}
                  style={screen_styles.expandButton}>
                  {expanded ? (
                    <Ionicons
                      name="close-circle"
                      color={colors.darkBlue}
                      style={screen_styles.expandIcon}
                      size={48}
                    />
                  ) : (
                    <Ionicons
                      name="information-circle"
                      color={colors.darkBlue}
                      style={screen_styles.expandIcon}
                      size={48}
                    />
                  )}
                </Pressable>
              </BoxItem>
              <BoxItem style={screen_styles.orderDetailsItem}>
                <View style={[screen_styles.driverContact, {marginRight: 10}]}>
                  <AntDesign
                    name="message1"
                    color={colors.softwhite}
                    size={24}
                  />
                </View>
                <View style={screen_styles.driverContact}>
                  <AntDesign name="phone" color={colors.softwhite} size={24} />
                </View>
              </BoxItem>

              <RouteDetails origin={origin} destination={destination} />
              <View style={{borderTopWidth: 1, borderTopColor: 'white'}}>
                <View style={screen_styles.orderDetailsItem}>
                  <BoxItem style={screen_styles.orderDetailsGridItem}>
                    <Ionicons
                      name="person"
                      color={colors.yellow}
                      style={{marginRight: 5}}
                      size={32}
                    />
                    <Text style={screen_styles.orderSummaryText}>
                      {order?.passengerNumber ? order.passengerNumber : 0}
                    </Text>
                  </BoxItem>

                  <BoxItem style={screen_styles.orderDetailsGridItem}>
                    <MaterialCommunityIcons
                      name="car"
                      color={colors.darkBlue}
                      style={{marginRight: 5}}
                      size={32}
                    />
                    <Text style={screen_styles.orderSummaryText}>
                      {order?.type ? order?.type : 'Standard'}
                    </Text>
                  </BoxItem>

                  <BoxItem style={screen_styles.orderDetailsGridItem}>
                    <Foundation
                      name="dollar"
                      color={colors.lightgreen}
                      style={{marginRight: 5}}
                      size={32}
                    />
                    <Text style={screen_styles.orderSummaryText}>15.34</Text>
                  </BoxItem>
                </View>
              </View>
            </BoxContainer>

            <BoxContainer
              style={screen_styles.orderSummaryConfirm}
              col={'full'}>
              <BoxItem style={screen_styles.orderSummaryCancelButton}>
                <RippleButton
                  style={screen_styles.orderSummaryCancelButtonText}
                  onPress={cancelOrder}
                  title="Cancel Order"
                />
              </BoxItem>
            </BoxContainer>
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default OrderScreen;
