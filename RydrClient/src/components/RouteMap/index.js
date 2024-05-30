import React, {useRef, useState, useEffect} from 'react';
import {View, Animated, useWindowDimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {
  setDistance,
  setDuration,
  setTripCoordinates,
} from '../../store/features/map/map-slice';
import component_styles from './styles';
import MapMarker from '../../../src/components/UI/MapMarker/index.js';
import {colors} from '../../shared/common/styles/index.js';

const RouteMap = ({origin, destination}) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [coordinatesReady, setCoordinatesReady] = useState(false);

  const mapRef = useRef(null);
  const {
    originAddress,
    destinationAddress,
    currentLatitude,
    currentLongitude,
    longitudeDelta,
    latitudeDelta,
    tripCoordinates,
  } = useAppSelector(state => state.mapState);

  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  const [timeToArrival, setTimeToArrival] = useState(new Date());

  const handleZoomIn = () => {
    mapRef.current?.getCamera().then(cam => {
      if (Platform.OS === 'android') {
        cam.zoom += 1;
      } else {
        cam.altitude /= 2;
      }
      mapRef.current?.animateCamera(cam);
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.getCamera().then(cam => {
      if (Platform.OS === 'android') {
        cam.zoom -= 1;
      } else {
        cam.altitude *= 2;
      }
      mapRef.current?.animateCamera(cam);
      s;
    });
  };

  // const region = calculateRegion(originLoc, destinationLoc);

  const onDirectionsReady = result => {
    dispatch(setDistance(result.distance));
    dispatch(setDuration(result.duration));
    dispatch(setTripCoordinates(result.coordinates));
    setCoordinatesReady(true);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && coordinatesReady && mapRef.current) {
      mapRef.current.fitToCoordinates([originLoc, destinationLoc], {
        edgePadding: {
          right: 75,
          bottom: 125,
          left: 75,
          top: 150,
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [originLoc, destinationLoc]);

  useEffect(() => {
    let mounted = true;
    let estArrival;
    if (mounted) {
      estArrival = setInterval(() => setTimeToArrival(new Date()), 200000);
    }
    return (cleanup = () => {
      clearInterval(estArrival);
      mounted = false;
    });
  }, []);

  return (
    <View style={component_styles.container}>
      {Object.keys(origin).length && Object.keys(destination).length ? (
        <>
          <MapView
            style={{width: '100%', height: '100%'}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            ref={mapRef}
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}>
            <MapViewDirections
              origin={originLoc}
              destination={destinationLoc}
              apikey={GOOGLE_API_KEY}
              strokeWidth={5}
              strokeColor="red"
              resetOnChange={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={onDirectionsReady}
            />

            <MapMarker
              coordinate={originLoc}
              pinColor={colors.green}
              bgColor={colors.green}
              title={originAddress}
            />
            <MapMarker
              coordinate={destinationLoc}
              pinColor={colors.red}
              bgColor={colors.red}
              title={destinationAddress}
            />
          </MapView>
        </>
      ) : null}
    </View>
  );
};

export default RouteMap;
