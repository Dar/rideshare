import React, {forwardRef, useEffect, useRef} from 'react';
import {useWindowDimensions, View, Text} from 'react-native';
import {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useStyle} from './styles.js';
import {deltaValue} from '../../constants';
import {GOOGLE_API_KEY} from '@env';
import {useAppSelector, useAppDispatch} from '../../store/app/hooks.ts';
import {
  setDistance,
  setDuration,
  setRouteNavigation,
} from '../../store/features/map/map-slice';

const MapViewDirectionsComponent = forwardRef((props, ref) => {
  const {mapViewBoundariesForCoords, calculatedRegion} = props;
  const {height, width} = useWindowDimensions();
  const aspectRatio = (width / height) * deltaValue;
  const styles = useStyle();

  //get MAP
  const {
    origin,
    destination,
    routeCoordinates,
    currentLatitude,
    currentLongitude,
    mapStatus,
  } = useAppSelector(state => state.mapState);

  //get DRIVER
  const {data} = useAppSelector(state => state.driver);

  //get ORDERS
  const {ordersdata, modalVisible} = useAppSelector(state => state.ordersState);

  //get ORDER
  const {order} = useAppSelector(state => state.orderState);
  const dispatch = useAppDispatch();

  // const originCoords = {
  //   latitude: 43.11992749683575,
  //   longitude: -79.21315516441803,
  // };

  // const destinationCoords = {latitude: 43.069458, longitude: -79.133958};

  const showMarkers = () => {
    if (ordersdata.length) {
      return (
        <>
          <Marker
            coordinate={{
              latitude: origin?.geometry?.location?.lat,
              longitude: origin?.geometry?.location?.lng,
            }}
            pinColor="green"
          />
          <Marker
            coordinate={{
              latitude: destination?.geometry?.location?.lat,
              longitude: destination?.geometry?.location?.lng,
            }}
            pinColor="red"
          />
        </>
      );
    }
    if (order?.status === 'PICKING_UP_CLIENT') {
      return (
        <>
          <Marker coordinate={mapViewBoundariesForCoords[1]} pinColor="green" />
        </>
      );
    }
    if (
      order?.status === 'STARTING_TRIP' ||
      order?.status === 'ARRIVED_AT_DESTINATION'
    ) {
      return (
        <>
          <Marker coordinate={mapViewBoundariesForCoords[1]} pinColor="green" />
        </>
      );
    }
  };

  const onDirectionsReady = result => {
    dispatch(setRouteNavigation(result.legs[0].steps));
    dispatch(setDistance(result.distance));
    dispatch(setDuration(result.duration));

    if (ref.current) {
      const allCoordinates = result.coordinates;
      ref.current.fitToCoordinates(allCoordinates, {
        edgePadding: {
          right: width / 20,
          bottom: height / 2.5, //started at 5
          left: width / 20,
          top: height / 30, //started at 5
        },
      });
    }
  };

  return (
    <>
      {Object.keys(origin).length && Object.keys(destination).length ? (
        <>
          <MapViewDirections
            origin={mapViewBoundariesForCoords[0]}
            destination={mapViewBoundariesForCoords[1]}
            optimizeWaypoints={true}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="red"
            onStart={params => {
              console.log(
                `Started between ${params.origin} and ${params.destination}`,
              );
            }}
            onReady={onDirectionsReady}
          />
          {showMarkers()}
        </>
      ) : null}
    </>
  );
});

export default MapViewDirectionsComponent;
