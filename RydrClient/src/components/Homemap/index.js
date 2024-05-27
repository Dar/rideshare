import React, {useEffect, useRef} from 'react';
import {Image, Animated, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getCarTypeImage} from '../../shared/helper/helperFunction';
import component_styles from './styles';
import {useAppDispatch} from '../../store/app/hooks';
import {getActiveCars} from '../../store/features/drivers/drivers-slice';

const HomeMap = ({
  curLatitude,
  curLongitude,
  latitudeDelta,
  longitudeDelta,
  drivers,
}) => {
  const dispatch = useAppDispatch();
  const mapRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!drivers?.length) {
        dispatch(getActiveCars());
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getDrivers = () => {
    return drivers
      ? drivers?.map(driver => {
          return (
            <Marker.Animated
              key={driver.id}
              coordinate={{
                latitude: driver.currentLat,
                longitude: driver.currentLng,
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  transform: [
                    {
                      rotate: `${driver.heading}deg`,
                    },
                  ],
                }}
                source={getCarTypeImage(driver.type)}
              />
            </Marker.Animated>
          );
        })
      : null;
  };

  return (
    <View>
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
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
          latitude: curLatitude,
          longitude: curLongitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}>
        {drivers?.length ? getDrivers() : null}
        <Marker
          coordinate={{
            latitude: curLatitude,
            longitude: curLongitude,
          }}
          anchor={{x: 0.5, y: 0.5}}>
          <Animated.View style={component_styles.markerWrap}>
            <Animated.View style={component_styles.ring} />
            <View style={component_styles.marker} />
          </Animated.View>
        </Marker>
      </MapView>
    </View>
  );
};

export default HomeMap;
