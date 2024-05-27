import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import imagePath from '../../shared/common/imagePath';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const locationPermission = () => {
  new Promise(async (resolve, reject) => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Niagara Taxi Location Permission',
        message: 'Niagara Taxi needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });
};

export const getCarTypeImage = type => {
  if (type === 'Standard') {
    return imagePath.cabSuv;
  }
  if (type === 'Comfort') {
    return imagePath.cabComfort;
  }
  return imagePath.cabStandard;
};

export const calculateRegion = (originCoords, destinationCoords) => {
  if (!originCoords || !destinationCoords) return;

  const allCoordinates = [originCoords, destinationCoords];
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  allCoordinates.forEach(coordinate => {
    minLat = Math.min(minLat, coordinate.latitude);
    maxLat = Math.max(maxLat, coordinate.latitude);
    minLng = Math.min(minLng, coordinate.longitude);
    maxLng = Math.max(maxLng, coordinate.longitude);
  });

  const deltaLat = (maxLat - minLat) * 1.5;
  const deltaLng = (maxLng - minLng) * 1.5;

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  return {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta: deltaLat,
    longitudeDelta: deltaLng,
  };
};

export const calculateHeading = (from, to) => {
  const lat1 = from.latitude;
  const lon1 = from.longitude;
  const lat2 = to.latitude;
  const lon2 = to.longitude;

  const deltaLon = lon2 - lon1;

  const x = Math.cos(lat2) * Math.sin(deltaLon);
  const y =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  let heading = Math.atan2(x, y);
  heading = (heading * 180) / Math.PI;

  return heading >= 0 ? heading : heading + 360;
};

const showError = message => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export {showError, showSuccess};
