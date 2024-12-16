import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Animated,
  View,
  Alert,
  Text,
  useWindowDimensions,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {Easing} from 'react-native-reanimated';
import {
  setDistance,
  setDuration,
  setDeltas,
} from '../../store/features/map/map-slice';
import {transparentColor, colors} from '../../shared/common/styles';
import {getCarTypeImage} from '../../shared/helper/helperFunction';
import {updateDriverLocation} from '../../store/features/drivers/driver-slice';
import {onDriverUpdated} from '../../graphql/subscriptions';
import { calculateDistance,proximityThreshold } from '../../constants';

const OrderMap = ({car}) => {
  const dispatch = useAppDispatch();
  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;
  const deltaValue = 0.0122;
  const {height, width} = useWindowDimensions();
  const aspectRatio = (width / height) * deltaValue;
  const mapRef = useRef(null);
  const {
    mapViewBoundariesForCoords,
    currentLatitude,
    currentLongitude,
    latitudeDelta,
    longitudeDelta,
    origin,
    destination,
    duration,
    distance,
  } = useAppSelector(state => state.mapState);
  const {order} = useAppSelector(state => state.orderState);


  const updateMapRegion = () => {
    const currentPosition = {
      latitude: car?.currentLat || 0,
      longitude: car?.currentLng || 0,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    mapRef?.current?.animateToRegion(currentPosition, 500);
  };

  useEffect(() => {
    if (order?.status !== 'PICKING_UP_CLIENT') {
      Animated.loop(
        Animated.timing(scaleAnimationRef, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();
    } else {
      scaleAnimationRef.setValue(0);
    }
  }, [order?.status]);

  useEffect(() => {
    if (order?.status !== 'PICKING_UP_CLIENT') {
      Animated.loop(
        Animated.timing(opacityAnimationRef, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();
    } else {
      opacityAnimationRef.setValue(1);
    }
  }, [order?.status]);

  useEffect(() => {
    dispatch(
      setDeltas({latitudeDelta: aspectRatio, longitudeDelta: deltaValue}),
    );
  }, []);

  useEffect(() => {
    if (car?.currentLat && car?.currentLng) {
      const distance = calculateDistance(
        car?.currentLat,
        car?.currentLng,
        origin?.details?.geometry?.location?.lat,
        origin?.details?.geometry?.location?.lng,
      );
      if (distance <= proximityThreshold) {
        Alert.alert('Alert', 'You have arrived at the origin coordinates!');
      }
    }
  }, [car?.currentLat, car?.currentLng]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (order?.status === 'NEW' || order?.status === 'PICKING_UP_CLIENT') {
        const newPitch = order?.status === 'NEW' ? 50 : 0;
        mapRef.current?.getCamera()?.then(camera => {
          if (camera) {
            const newCamera = {...camera, pitch: newPitch};
            mapRef.current?.animateCamera(newCamera, {duration: 500});
          }
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [order]);

  // Subscribe to car updates
  // useEffect(() => {
  //   if (!car) {
  //     return;
  //   }
  //   if (
  //     order?.driverId !== 0 &&
  //     order?.status === 'PICKING_UP_CLIENT' &&
  //     car?.isActive
  //   ) {
  //     dispatch(driverSubscriptionUpdate(order?.driverId));
  //   }
  // }, [order?.driverId, order?.status, car?.isActive]);

  // useEffect(() => {
  //   if (!car) {
  //     return;
  //   }
  //   if (
  //     order?.driverId &&
  //     order?.status === 'PICKING_UP_CLIENT' &&
  //     car?.isActive
  //   ) {
  //     const subscription = API.graphql(
  //       graphqlOperation(onDriverUpdated, {id: order.driverId}),
  //     ).subscribe({
  //       next: response => {
  //         const updatedDriver = response.value.data.onDriverUpdated;
  //         console.log('UPDATE', updatedDriver);
  //         if (updatedDriver) {
  //           const {currentLat, currentLng, heading} = updatedDriver;
  //           dispatch(updateDriverLocation({currentLat, currentLng, heading}));
  //         }
  //       },
  //       error: error => {
  //         console.error('Subscription error:', error);
  //       },
  //     });
  //     return () => {
  //       subscription.unsubscribe();
  //     };
  //   }
  // }, [order?.driverId, order?.status, car?.isActive]);

  useEffect(() => {
    let mounted = true;
    if (order?.status !== 'NEW' && mounted) {
      if (mapViewBoundariesForCoords.length && mapRef.current) {
        const latDelta = Math.abs(
          mapViewBoundariesForCoords[0].latitude -
            mapViewBoundariesForCoords[1].latitude,
        );
        const lngDelta = Math.abs(
          mapViewBoundariesForCoords[0].longitude -
            mapViewBoundariesForCoords[1].longitude,
        );

        let edgePadding = {
            right: 150 + lngDelta * 20,
            bottom: 150 + latDelta * 20,
            left: 150 + lngDelta * 20,
            top: 150 + latDelta * 20,
          };
    
      
        mapRef.current.fitToCoordinates(
          [mapViewBoundariesForCoords[0], mapViewBoundariesForCoords[1]],
          {
            edgePadding,
          },
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [mapViewBoundariesForCoords[0], mapViewBoundariesForCoords[1], distance]);

  const showMarkers = () => {
    if (order?.status === 'PICKING_UP_CLIENT') {
      return (
        <>
          <Marker.Animated
            key={car?.id}
            coordinate={{latitude: car?.currentLat, longitude: car?.currentLng}}
            anchor={{x: 0.45, y: 0.65}}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>{Math.ceil(duration)} min</Text>
            </View>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                transform: [
                  {
                    rotate: `${car?.heading}deg`,
                  },
                ],
              }}
              source={getCarTypeImage(car?.type)}
            />
          </Marker.Animated>
          <Marker
            coordinate={{
              latitude: origin?.details?.geometry?.location?.lat,
              longitude: origin?.details?.geometry?.location?.lng,
            }}
            pinColor="green"
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <MapView
      style={{
        width: '100%',
        height: '100%',
      }}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      mapType="standard"
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
      camera={{
        center: {
          latitude: currentLatitude,
          longitude: currentLongitude,
        },
        altitude: 1000,
        heading: 0,
        zoom: 15,
      }}
      initialRegion={{
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      }}>
      {order?.status === 'PICKING_UP_CLIENT' &&
      mapViewBoundariesForCoords.length ? (
        <>
          <MapViewDirections
            origin={mapViewBoundariesForCoords[0]}
            destination={mapViewBoundariesForCoords[1]}
            apikey={GOOGLE_API_KEY}
            strokeWidth={4}
            strokeColor="red"
            onReady={result => {
              dispatch(setDuration(result.duration));
              dispatch(setDistance(result.distance));
            }}
          />
        </>
      ) : null}

      <Marker
        coordinate={{
          latitude: currentLatitude,
          longitude: currentLongitude,
        }}
        anchor={{x: 0.5, y: 0.5}}>
        {order?.status !== 'PICKING_UP_CLIENT' ? (
          <Animated.View style={styles.markerWrap}>
            <Animated.View
              style={[
                styles.ring,
                {opacity: opacityAnimationRef},
                {transform: [{scale: scaleAnimationRef}]},
              ]}
            />
            <View style={styles.marker} />
          </Animated.View>
        ) : (
          <View style={styles.marker} />
        )}
      </Marker>
      {showMarkers()}
    </MapView>
  );
};

export default OrderMap;

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: transparentColor.blue,
    position: 'absolute',
  },
  ring: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: transparentColor.blue,
    borderWidth: 1,
    borderColor: transparentColor.blue,
    opacity: 1,
  },
  infoBox: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  infoBoxText: {
    color: colors.softwhite,
  },
});
