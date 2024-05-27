import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createOrder} from '../../graphql/mutations';
import {colors} from '../../shared/common/styles/';
import {useRoute, useNavigation} from '@react-navigation/native';
import RouteMap from '../../components/RouteMap';
import RideTypeSelect from '../../components/RideTypeSelect';
import TripDetails from '../../components/TripDetails';
import screen_styles from './styles';
import WithBottomSheet from '../../components/UI/WithBottomSheet';
import CustomButton from '../../components/UI/CustomButton';
import {
  setOrder,
  updateOrderData,
  onOrderSubmit,
  setOrderActive,
} from '../../store/features/order/order-slice';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {
  setOriginAddress,
  setDestinationAddress,
  setOriginPlace,
} from '../../store/features/map/map-slice';
import {GOOGLE_API_KEY} from '../../constants';
import RippleButton from '../../components/UI/RippleButton';
import {useFocusEffect} from '@react-navigation/native';

const MapSearchResultsScreen = props => {
  const height = useWindowDimensions().height;
  const [inputNotes, setInputNotes] = useState('');
  const route = useRoute();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [450, '75%'], []);
  const [isVisible, setIsVisible] = useState(false);

  const {order} = useAppSelector(state => state.orderState);
  const dispatch = useAppDispatch();
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const navigation = useNavigation();

  const {currentAddress, origin, destination} = useAppSelector(
    state => state.mapState,
  );

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      return () => {
        setIsVisible(false);
      };
    }, []),
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted && origin && destination) {
      dispatch(
        setOriginAddress(origin?.data?.structured_formatting?.main_text),
      );
      dispatch(
        setDestinationAddress(
          destination?.data?.structured_formatting?.main_text,
        ),
      );
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const date = new Date();
      const input = {
        createdAt: date.toISOString(),
        type: order?.type ? order?.type : 'Standard',
        origin: origin.details.place_id,
        destination: destination.details.place_id,
        originAddress: 'ADD ORIGIN ADDRESS HERE',
        destinationAddress: 'ADD DESTINATION ADDRESS HERE',
        driverId: '0',
        status: 'NEW',
        fare: 0,
        userId: userInfo.attributes.sub,
        passengerNumber: order?.passengerNumber
          ? order?.passengerNumber
          : '1-4',
        paymentType: order?.paymentType ? order?.paymentType : 'credit_card',
        notes: order?.notes ? order?.notes : '',
        designate: order?.designate ? order?.designate : 'personal',
        scheduleDate: order?.scheduleDate ? order?.scheduleDate : '',
      };
      const response = await API.graphql(
        graphqlOperation(createOrder, {
          input: input,
        }),
      );
      dispatch(
        setOrder({
          id: response.data?.createOrder?.id,
          ...input,
        }),
      );
      dispatch(setOrderActive(true));
      navigation.navigate('Orders', {
        id: response.data?.createOrder?.id,
      });
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

  return (
    <>
      {isVisible && (
        <>
          <View style={screen_styles.screenContainer}>
            <View style={{height: height - 450}}>
              {Object.keys(origin).length && Object.keys(destination).length ? (
                <RouteMap origin={origin} destination={destination} />
              ) : null}
            </View>
            {/* Details of the ride */}
            <View style={{flex: 1}}>
              <RideTypeSelect
                typeState={order?.type ? order.type : 'Standard'}
              />
              <TripDetails handlePresentModalPress={handlePresentModalPress} />
              <View style={screen_styles.goSearchButtonContainer}>
                <RippleButton
                  style={screen_styles.goSearchButton}
                  buttonStyle={screen_styles.goSearchButtonText}
                  onPress={onSubmit}
                  title="Confirm Details"
                />
              </View>
            </View>
            <WithBottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              handleDismissModalPress={handleDismissModalPress}>
              <View>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  Message for Driver
                </Text>
              </View>
              <TextInput
                style={{
                  marginTop: 40,
                  height: 300,
                  paddingHorizontal: 20,
                  borderColor: colors.darkBlue,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setInputNotes(text)}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <CustomButton
                  text="Add note"
                  onPress={() => {
                    dispatch(updateOrderData({notes: inputNotes}));
                  }}
                  bgColor={colors.darkBlue}
                  fgColor={colors.softwhite}
                />
                <CustomButton
                  text="Cancel"
                  onPress={handleDismissModalPress}
                  bgColor={colors.softwhite}
                  fgColor={colors.darkBlue}
                  style={{
                    borderColor: colors.darkBlue,
                    borderWidth: 1,
                  }}
                />
              </View>
            </WithBottomSheet>
          </View>
        </>
      )}
    </>
  );
};

export default MapSearchResultsScreen;
