import React, {
  Suspense,
  useState,
  lazy,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Animated,
  ActivityIndicator,
  Platform,
  UIManager,
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewOrderPopup from '../../components/NewOrderPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../shared/common/styles/';
import BoxContainer from '../../components/UI/BoxContainer/index.js';
import OrderCardDetails from '../../components/OrdersCardDetails/index.js';
import {useStyle} from './styles.js';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {
  getLiveLocation,
  getCurrentAddress,
  getPlaceIdDetails,
  setCurrentPosition,
  updateMovement,
  clearMapState,
  setDeltas,
  setRouteNavigation,
  setMapViewBoundariesForCoords,
} from '../../store/features/map/map-slice';
import {
  fetchDriver,
  updateActiveDriver,
} from '../../store/features/driver/driver-slice';
import {
  fetchOrders,
  updateOrderList,
  clearOrdersState,
  setModalVisible,
  addNewOrderToList,
} from '../../store/features/order/orders-slice';
import {
  setOrder,
  getActiveOrder,
  clearOrderState,
  setOrderState,
} from '../../store/features/order/order-slice';
import {
  showCard,
  hideCard,
  hideMapViewControls,
  showMapViewControls,
  showBottomBar,
  panBottomBar,
  hideBottomBar,
  slideSideMenu,
} from '../../constants/animations.js';
import MapViewDirectionsComponent from '../../components/MapViewDirections/';
import BottomBar from '../../modules/BottomBar/index.js';
import {calculateRegion} from '../../shared/helper/helperFunction.js';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import RouteNavigation from '../../components/RouteNavigation/index.js';
import {
  onCreateOrder,
  onOrderUpdated,
  onDriverUpdated,
} from '../../graphql/subscriptions';
import {calculateDistance,proximityThreshold} from '../../constants/index.js';
import WithBottomSheet from '../../components/UI/WithBottomSheet/index.js';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Messaging = lazy(() => import('../../modules/Messaging'));
const TripItinerary = lazy(() => import('../../modules/TripItinerary'));
const DriverSettings = lazy(() => import('../../modules/DriverSettings'));

//Screen Start
const HomeScreen = () => {
  useKeepAwake();
  const deltaValue = 0.0122;
  const {height, width} = useWindowDimensions();
  const aspectRatio = (width / height) * deltaValue;
  const dispatch = useAppDispatch();
  const [showTestBox, setShowBox] = useState(false);

  const activeOrderSub = useRef();
  const activeDriver = useRef();
  const ordersSubscriptoin = useRef();
  const showInfoBox = () => {
    setShowBox(!showTestBox);
  };
  // get MAP
  const {
    currentLatitude,
    currentLongitude,
    heading,
    latitudeDelta,
    longitudeDelta,
    origin,
    destination,
    mapViewBoundariesForCoords,
    routeCoordinates,
  } = useAppSelector(state => state.mapState);

  //get DRIVER
  const {data} = useAppSelector(state => state.driver);

  //get ORDERS
  const {ordersdata, modalVisible} = useAppSelector(state => state.ordersState);

  //get ORDER
  const {order} = useAppSelector(state => state.orderState);

  //refs
  const markerRef = useRef(null);
  const mapView = useRef(null);

  //LOCAL STATE
  const [pause, setPause] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [markerCoord, setMarkerCoords] = useState(null);
  const [directions, setDirections] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [pan, setPanUp] = useState(false);

  //USE STYLE
  const styles = useStyle();

  //Animation
  const panelDisplay = useState(new Animated.Value(-height))[0];
  const panelHeight = useState(new Animated.Value(0))[0];
  const cashBox = useState(new Animated.Value(0))[0];
  const sideBar = useState(new Animated.Value(0))[0];
  const bottomBar = useState(new Animated.Value(0))[0];

  //Bottom Sheet Component Load
  const bottomSheetRef = useRef(null);
  const [currentComponent, setCurrentComponent] = useState(null);
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const handleLoadMessaging = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setCurrentComponent(
      <Messaging handleBottomSheetClose={handleBottomSheetClose} />,
    );
  };

  const handleLoadSettings = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setCurrentComponent(
      <DriverSettings handleBottomSheetClose={handleBottomSheetClose} />,
    );
  };
  const handleLoadTripItinerary = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setCurrentComponent(<TripItinerary />);
  };

  const handleBottomSheetClose = () => {
    bottomSheetRef.current?.close();
  };

  const showRiderPanel = () => {
    if (order?.status !== 'STARTING_TRIP') {
      setPanUp(prev => !prev);
      const panValue = pan ? -200 : 0;
      const slideValue = pan ? 200 : 0;
      panBottomBar(bottomBar, panValue);
      slideSideMenu(sideBar, slideValue);
    } else {
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!order && data?.isActive && ordersdata.length > 0) {
        hideBottomBar(bottomBar);
        hideMapViewControls(cashBox, panelDisplay, sideBar, height);
      }
      if (ordersdata.length === 0) {
        showBottomBar(bottomBar);
      }
      if (order) {
        dispatch(
          getPlaceIdDetails({
            originData: order.origin,
            destinationData: order.destination,
          }),
        );
      } else if (ordersdata.length) {
        dispatch(
          getPlaceIdDetails({
            originData: ordersdata[0].origin,
            destinationData: ordersdata[0].destination,
          }),
        );
      }
      if (
        order?.status === 'ARRIVED_FOR_PICKUP' ||
        order?.status === 'ARRIVED_AT_DESTINATION'
      ) {
        panBottomBar(bottomBar, -200);
        slideSideMenu(sideBar, 200);
      }
      if (order?.status === 'STARTING_TRIP' || !order) {
        slideSideMenu(sideBar, 0);
      }
      if (order?.status === 'COMPLETE_RIDE') {
        panBottomBar(bottomBar, 0);
        slideSideMenu(sideBar, 200);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [order?.status, data?.isActive, ordersdata?.length]);

  const tripDistance = useMemo(() => {
    let distance = 50;
    if (data?.currentLat && data?.currentLng) {
      switch (order?.status) {
        case 'PICKING_UP_CLIENT':
          distance = calculateDistance(
            {
              latitude: data.currentLat,
              longitude: data.currentLng,
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
              latitude: data.currentLat,
              longitude: data.currentLng,
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
  }, [data?.currentLat, data?.currentLng, order?.status, origin, destination]);

  useEffect(() => {
    if (order?.status === 'PICKING_UP_CLIENT') {
      console.log('tripDistance', tripDistance);
      if (tripDistance <= proximityThreshold) {
        dispatch(setOrderState('ARRIVED_FOR_PICKUP'));
        const input = {
          id: order.id,
          status: 'ARRIVED_FOR_PICKUP',
          driverId: data?.id,
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
          driverId: data.id,
        };
        dispatch(setOrder(input));
      }
    }
  }, [tripDistance, order?.status]);

  //Iniitial load
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(
        setDeltas({
          latitudeDelta: aspectRatio,
          longitudeDelta: deltaValue,
        }),
      );
      dispatch(getLiveLocation());
      dispatch(fetchDriver());
      if (currentLatitude !== 0 && currentLongitude !== 0) {
        dispatch(
          getCurrentAddress({
            lat: currentLatitude,
            lng: currentLongitude,
          }),
        );
      }
      if (order) {
        dispatch(
          getPlaceIdDetails({
            originData: order.origin,
            destinationData: order.destination,
          }),
        );
      }
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && data?.isActive) {
      if (!order) {
        dispatch(fetchOrders());
      } else {
        dispatch(getActiveOrder());
      }

      ordersSubscriptoin.current = API.graphql(
        graphqlOperation(onCreateOrder),
      ).subscribe({
        next: orderData => {
          const newOrder = orderData.value.data.onCreateOrder;
          dispatch(addNewOrderToList(newOrder));
        },
        error: error => {
          console.error('Error subscribing to new orders', error);
        },
      });

      return () => {
        ordersSubscriptoin.current.unsubscribe();
        isMounted = false;
      };
    }
  }, [data?.isActive]);

  // ******************** RUN TRIP SIMULATOR
  // ****************************************
  // ****************************************

  useEffect(() => {
    if (order?.status === 'PICKING_UP_CLIENT') {
      const interval = setInterval(() => {
        dispatch(updateMovement(routeCoordinates[0]?.end_location));
        dispatch(setRouteNavigation(routeCoordinates.slice(1)));
        // dispatch(
        //   updateActiveDriver({
        //     currentLat: currentLatitude,
        //     currentLng: currentLongitude,
        //     heading,
        //   }),
        // );
      }, 1000);

      if (!routeCoordinates.length) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    } else if (order?.status === 'STARTING_TRIP') {
      const interval = setInterval(() => {
        dispatch(updateMovement(routeCoordinates[0]?.end_location));
        dispatch(setRouteNavigation(routeCoordinates.slice(1)));
      }, 1000);

      if (!routeCoordinates.length) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [routeCoordinates.length, order?.status]);

  // ******************** END RUN TRIP SIMULATOR
  // ****************************************
  // ****************************************

  // Drive location change

  const onDriverLocationChange = async event => {
    // const {latitude, longitude, heading} = event.nativeEvent.coordinate;
    // dispatch(setCurrentPosition({latitude, longitude, heading}));
    // mapView.current.animateCamera({
    //   heading: heading,
    //   pitch: 0,
    //   zoom: 10,
    // });
  };

  // Watch Position
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (currentLatitude !== 0 && currentLongitude !== 0) {
        setIsLoading(false);

        dispatch(
          updateActiveDriver({
            currentLat: currentLatitude,
            currentLng: currentLongitude,
            heading,
          }),
        );

        dispatch(
          getCurrentAddress({
            lat: currentLatitude,
            lng: currentLongitude,
          }),
        );
      }

      return () => {
        isMounted = false;
      };
    }
  }, [currentLatitude, currentLongitude, heading]);

  const onDecline = () => {
    if (ordersdata.length === 1) {
      dispatch(clearOrdersState());
      dispatch(clearMapState());
    }
    if (!ordersdata.length) {
      showMapViewControls(cashBox, sideBar);
    }
    setResetKey(prevKey => prevKey + 1);
    dispatch(updateOrderList(ordersdata));
  };

  const onAccept = activeOrder => {
    const input = {
      id: activeOrder.id,
      status: 'PICKING_UP_CLIENT',
      driverId: data.id,
    };
    dispatch(setOrder(input));
    updateMapRegion();
    dispatch(clearOrdersState());
    dispatch(setModalVisible(false));
    showMapViewControls(cashBox, sideBar);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (ordersdata.length > 0) {
        dispatch(
          getPlaceIdDetails({
            originData: ordersdata[0]?.origin,
            destinationData: ordersdata[0]?.destination,
          }),
        );
        dispatch(setModalVisible(true));
      }

      if (ordersdata.length === 0) {
        updateMapRegion();
        dispatch(setModalVisible(false));
        showMapViewControls(cashBox, sideBar);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [ordersdata.length]);

  const updateMapRegion = () => {
    const currentPosition = {
      latitude: currentLatitude || 0,
      longitude: currentLongitude || 0,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    mapView?.current?.animateToRegion(currentPosition, 500);
  };

  const onClose = () => {
    dispatch(setModalVisible(false));
  };

  useEffect(() => {
    if (mapView.current) {
      const cameraHeading = mapView.current.getCamera().heading || 0;
      markerRef.current.setNativeProps({
        rotation: -cameraHeading,
      });
    }
  }, [heading]);

  // Subscribe to order updates
  useEffect(() => {
    if (!order) {
      return;
    }

    if (data?.isActive && order) {
      activeOrderSub.current = API.graphql(
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

    return () => activeOrderSub.current?.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data) {
      activeDriver.current = API.graphql(
        graphqlOperation(onDriverUpdated, {id: data?.id}),
      ).subscribe({
        next: ({value}) => {
          console.log('activeDriver', value);

          const updatedDriver = value.data.onDriverUpdated;
          if (updatedDriver) {
            dispatch(
              updateActiveDriver({
                id: data?.id,
                ...updatedDriver,
              }),
            );
          }
        },
        error: error => console.warn(JSON.stringify(error)),
      });
    }

    return () => activeDriver.current.unsubscribe();
  }, [data]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!order && ordersdata.length) {
        dispatch(
          setMapViewBoundariesForCoords([
            {
              latitude: origin?.geometry?.location?.lat,
              longitude: origin?.geometry?.location?.lng,
            },
            {
              latitude: destination?.geometry?.location?.lat,
              longitude: destination?.geometry?.location?.lng,
            },
          ]),
        );
      } else if (order?.status === 'PICKING_UP_CLIENT') {
        dispatch(
          setMapViewBoundariesForCoords([
            {
              latitude: currentLatitude,
              longitude: currentLongitude,
            },
            {
              latitude: origin?.geometry?.location?.lat,
              longitude: origin?.geometry?.location?.lng,
            },
          ]),
        );
      } else if (order?.status === 'STARTING_TRIP') {
        dispatch(
          setMapViewBoundariesForCoords([
            {
              latitude: currentLatitude,
              longitude: currentLongitude,
            },
            {
              latitude: destination?.geometry?.location?.lat,
              longitude: destination?.geometry?.location?.lng,
            },
          ]),
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [order?.status, currentLatitude, currentLongitude, origin, destination]);

  const renderMap = () => {
    if (currentLatitude !== 0 && currentLongitude !== 0) {
      const currentPosition = {
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      };

      const region = calculateRegion(
        mapViewBoundariesForCoords[0],
        mapViewBoundariesForCoords[1],
      );

      return (
        <MapView
          style={{
            flex: 1,
          }}
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          onUserLocationChange={onDriverLocationChange}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userLocationUpdateInterval={4000}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          {...(!order && ordersdata.length && modalVisible
            ? {
                initialRegion: {
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta,
                },
              }
            : {
                region:
                  order?.status === 'PICKING_UP_CLIENT' ||
                  order?.status === 'STARTING_TRIP'
                    ? region
                    : {
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                      },
              })}>
          <Marker.Animated
            ref={markerRef}
            anchor={{x: 0.5, y: 0.5}}
            coordinate={currentPosition}>
            <View style={styles.markerImage}>
              <Entypo
                name={'arrow-with-circle-up'}
                size={50}
                color={colors.white}
                style={{transform: [{rotate: `${heading}deg`}]}}
                // coordinate={
                //   mapView.current && mapView.current.getCamera().center
                // }
              />
            </View>
          </Marker.Animated>
          {origin && destination ? (
            <MapViewDirectionsComponent
              ref={mapView}
              calculatedRegion={region}
              mapViewBoundariesForCoords={mapViewBoundariesForCoords}
            />
          ) : null}
        </MapView>
      );
    }
  };

  const moveTo = async position => {
    const camera = await mapView.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapView.current?.animateCamera(camera, {duration: 1000});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: colors.softwhite}}>
      <View style={styles.container}>
        {/* {showTestBox ? (
          <View
            style={{
              backgroundColor: colors.black,
              position: 'absolute',
              top: 0,
              width: '100%',
              zIndex: 100,
            }}>
            <Text style={{color: colors.softwhite}}>
              Current Lat: {currentLatitude}
            </Text>
            <Text style={{color: colors.softwhite}}>
              Current Lng: {currentLongitude}
            </Text>
            <Text style={{color: colors.softwhite}}>Heading: {heading}</Text>
            <Text>----------------------</Text>
            <Text style={{color: colors.softwhite}}>
              data.currentLat: {data?.currentLat}
            </Text>
            <Text style={{color: colors.softwhite}}>
              data.currentLng: {data?.currentLng}
            </Text>
          </View>
        ) : null} */}

        {isLoading ? (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={colors.darkBlue}
          />
        ) : (
          <>
            {/* {order ? (
              <RouteNavigation
                currentAddress={currentAddress}
                currentLatitude={currentLatitude}
                currentLongitude={currentLongitude}
                heading={heading}
                directions={directions}
              />
            ) : null} */}
            {renderMap()}
            <Animated.View
              style={[styles.cardContainer, {height: panelHeight}]}>
              <Pressable
                onPress={() =>
                  hideCard(panelHeight, panelDisplay, sideBar, height)
                }>
                <Animated.View
                  style={[
                    styles.cardContent,
                    {
                      transform: [{translateY: panelDisplay}],
                    },
                  ]}>
                  <BoxContainer style={styles.card}>
                    <OrderCardDetails />
                  </BoxContainer>
                </Animated.View>
              </Pressable>
            </Animated.View>
            <Animated.View
              style={[
                styles.balanceButton,
                {transform: [{translateY: cashBox}]},
              ]}>
              <BoxContainer style={styles.balanceContainer}>
                <Pressable
                  onPress={() =>
                    showCard(panelHeight, panelDisplay, sideBar, height)
                  }>
                  <View styles={styles.balanceButtonContents}>
                    <Text style={styles.balanceText}>
                      <Text style={{color: colors.lightgreen}}>$</Text>0.00
                    </Text>
                  </View>
                </Pressable>
              </BoxContainer>
            </Animated.View>
            <Animated.View
              style={[styles.sideMenu, {transform: [{translateX: sideBar}]}]}>
              <TouchableOpacity
                onPress={() => showInfoBox()}
                style={[styles.roundButton, {top: 0, right: 10}]}>
                <AntDesign
                  name={'search1'}
                  size={28}
                  color={colors.softwhite}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearMapState());
                  dispatch(clearOrderState());
                  dispatch(clearOrdersState());
                }}
                style={[styles.roundButton, {top: 80, right: 10}]}>
                <Ionicons name={'shield'} size={28} color={colors.softwhite} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setPause(!pause);
                  console.warn('Pause');
                }}
                style={[styles.pauseButton, {top: 160, right: 10}]}>
                {pause ? (
                  <View style={styles.expandedButton}>
                    <Text style={{color: '#fff', fontSize: 18}}>Resume</Text>
                    <FontAwesome
                      name={'taxi'}
                      size={28}
                      color={colors.softwhite}
                    />
                  </View>
                ) : (
                  <FontAwesome
                    name={'coffee'}
                    size={28}
                    color={colors.softwhite}
                  />
                )}
              </TouchableOpacity>
            </Animated.View>
            {/* Bottom Sheet */}
          </>
        )}

        <Animated.View
          style={[
            styles.bottomContainer,
            {transform: [{translateY: bottomBar}]},
          ]}>
          <BottomBar
            showRiderPanel={showRiderPanel}
            handleLoadMessaging={handleLoadMessaging}
            handleLoadSettings={handleLoadSettings}
            handleLoadTripItinerary={handleLoadTripItinerary}
            tripDistance={tripDistance}
          />
        </Animated.View>
        <WithBottomSheet
          snapPoints={snapPoints}
          handleBottomSheetClose={handleBottomSheetClose}
          ref={bottomSheetRef}>
          <Suspense
            fallback={
              <View>
                <Text>Loading...</Text>
              </View>
            }>
            {currentComponent}
          </Suspense>
        </WithBottomSheet>
      </View>
      {!order && modalVisible && ordersdata.length && origin && destination ? (
        <NewOrderPopup
          newOrder={ordersdata[0]}
          duration={2}
          originAddress={origin}
          destinationAddress={destination}
          distance={0.5}
          onDecline={onDecline}
          resetKey={resetKey}
          onClose={onClose}
          onAccept={() => onAccept(ordersdata[0])}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
