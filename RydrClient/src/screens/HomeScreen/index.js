import React, {useCallback, useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Pressable,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import HomeMap from '../../components/Homemap';
import Message from '../../components/Message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import TimeDatePicker from '../../components/TimeDatePicker';
import WithBottomSheet from '../../components/UI/WithBottomSheet';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import RippleButton from '../../components/UI/RippleButton';

import {
  getLiveLocation,
  getCurrentAddress,
  clearMapState,
  setDeltas,
} from '../../store/features/map/map-slice';
import {updateActiveUser} from '../../store/features/riders/rider-slice';
import {setOrderActive, setOrder, fetchOrder } from '../../store/features/order/order-slice';
import {colors} from '../../shared/common/styles/';
import screen_styles from './styles';
import {
  setDrivers,
  updateDrivers,
  addDrivers,
  removeDrivers,
  clearDriversState,
  getActiveCars
} from '../../store/features/drivers/drivers-slice';
import {clearDriverState} from '../../store/features/drivers/driver-slice';
import {onDriversUpdated, onDriverDeleted} from '../../graphql/subscriptions';
import { fetchCurrentUserOrder } from '../../shared/helper/orderHelpers';

const HomeScreen = props => {
  const snapPoints = useMemo(() => ['50%', '100%'], []);
  const [isLoading, setIsLoading] = useState(true);
  const [message, getMessage] = useState(false);
  const [toggleFav, setToggleFav] = useState(false);
  const [addFav, setAddFav] = useState('hearto');
  const bottomSheetRef = useRef(null);
  const deltaValue = 0.0122;
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const aspectRatio = (width / height) * deltaValue;
  const [isVisible, setIsVisible] = useState(false);
  const subscriptionAddDriversRef = useRef();
  const subscriptionDeleteDriverRef = useRef();

  const {
    currentLatitude,
    currentLongitude,
    latitudeDelta,
    longitudeDelta,
    currentAddress,
  } = useAppSelector(state => state.mapState);

  const {order, isOrderLoading, isOrderActive} = useAppSelector(
    state => state.orderState,
  );
  const {drivers} = useAppSelector(state => state.drivers);
  const {profile} = useAppSelector(state => state.rider);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      return () => {
        setIsVisible(false);
      };
    }, []),
  );

  useEffect(() => {
    const checkActiveOrder = async () => {
      if (profile?.sub) {
        try {
          const activeOrder = await fetchCurrentUserOrder(dispatch, profile.sub);
          if (activeOrder) {
            navigation.navigate('Orders', { orderId: activeOrder.id });
          }
        } catch (error) {
          console.error('Error fetching active order:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    checkActiveOrder();

    return () => {
      setIsLoading(false);
    }

  }, [dispatch, profile?.sub, navigation]);

  useEffect(() => {
    dispatch(
      setDeltas({latitudeDelta: aspectRatio, longitudeDelta: deltaValue}),
    );
    dispatch(getLiveLocation());
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && currentLatitude !== 0 && currentLongitude !== 0) {
      dispatch(
        getCurrentAddress({lat: currentLatitude, lng: currentLongitude}),
      );
      dispatch(
        updateActiveUser({
          currentLat: currentLatitude,
          currentLng: currentLongitude,
        }),
      );
    }
    return () => {
      mounted = false;
    };
  }, [currentLatitude, currentLongitude]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const goToSearch = () => {
    dispatch(setOrderActive(false));
    dispatch(clearMapState());
    dispatch(clearDriversState());    
    dispatch(clearDriverState());    
    dispatch(setOrder(null));
    navigation.navigate('MapSearchScreen');
  };

  const addToFav = () => {
    setToggleFav(!toggleFav);
    return toggleFav ? setAddFav('hearto') : setAddFav('heart');
  };


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if(!drivers?.length){
        dispatch(getActiveCars());

      }
    }
    return () => {
      isMounted = false;
    };
  }, []);


  const activeStates = useMemo(() => {
    return drivers.map(driver => driver.isActive).join(',');
  }, [drivers]);

  useEffect(() => {
    if (!drivers) {
      return;
    }

    subscriptionAddDriversRef.current = API.graphql(
      graphqlOperation(onDriversUpdated),
    ).subscribe({
      next: ({ value }) => {
        if (onDriversUpdated) {
          const driver = value.data.onDriversUpdated;
          if (driver.isActive) {
            dispatch(addDrivers(driver));
          } else if (!driver.isActive) {
            dispatch(removeDrivers(driver));
          }
        }
      },
      error: error => console.warn(JSON.stringify(error)),
    });

    return () => {
      subscriptionAddDriversRef.current.unsubscribe();
    };
  }, [activeStates]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <>
      {isVisible && (
        <View style={screen_styles.screenContainer}>
          <View style={{height: height - 250}}>
            {currentLatitude && currentLongitude ? (
              <HomeMap
                drivers={drivers}
                curLatitude={currentLatitude}
                curLongitude={currentLongitude}
                latitudeDelta={latitudeDelta}
                longitudeDelta={longitudeDelta}
              />
            ) : null}
          </View>
          {message && (
            <View>
              <Message />
            </View>
          )}
          <View style={screen_styles.panelWrapper}>
            <View style={screen_styles.panelContainer}>
              {/* current location box*/}
              <View style={screen_styles.panelLeft}>
                <View style={screen_styles.currLocation}>
                  <View>
                    <Text style={screen_styles.currLocationTitle}>
                      Current Location:
                    </Text>

                    <Text style={screen_styles.currLocationText}>
                      {currentAddress
                        ? currentAddress
                        : 'Getting your location...'}
                    </Text>
                  </View>
                  {currentAddress ? (
                    <View style={screen_styles.currLocationFav}>
                      <Pressable onPress={addToFav}>
                        <AntDesign name={addFav} size={24} color="#fff" />
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
            <View style={screen_styles.buttonContainer}>
              <View style={screen_styles.bookButton}>
                <RippleButton
                  style={screen_styles.pressableButton}
                  buttonStyle={screen_styles.pressableButtonText}
                  onPress={goToSearch}
                  title="BOOK A RIDE"
                />
              </View>
              <Pressable
                onPress={handlePresentModalPress}
                style={screen_styles.scheduleButton}>
                <AntDesign
                  name="clockcircle"
                  color={colors.softwhite}
                  size={20}
                />
                <Text style={screen_styles.sheduledBoxText}>
                  {order?.scheduleDate !== '' ? 'Active' : 'Now'}
                </Text>
                <View style={screen_styles.chevron}>
                  <Entypo
                    name={'chevron-down'}
                    color={colors.softwhite}
                    size={18}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <WithBottomSheet
            handleDismissModalPress={handleDismissModalPress}
            ref={bottomSheetRef}
            snapPoints={snapPoints}>
            <TimeDatePicker
              handleDismissModalPress={handleDismissModalPress}
              {...props}
            />
          </WithBottomSheet>
        </View>
      )}
    </>
  );
};

export default HomeScreen;
