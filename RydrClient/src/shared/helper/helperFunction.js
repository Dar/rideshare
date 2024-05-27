import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import imagePath from '../../shared/common/imagePath';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position?.coords.latitude,
          longitude: position?.coords.longitude,
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
  switch (type) {
    case 'Standard':
      return imagePath.cabSuv;
    case 'Comfort':
      return imagePath.cabSuv;
    default:
      return null;
  }
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

const getFare = (order, distance = 0) => {
  let fare = 0;
  if (order?.type === 'Standard') {
    fare = distance.toFixed(2) * 1.05;
  } else if (order?.type === 'Premium') {
    fare = distance.toFixed(2) * 1.5;
  } else if (order?.type === 'Luxury') {
    fare = distance.toFixed(2) * 2;
  } else {
    fare = distance.toFixed(2) * 1.05;
  }
};

const calculateRegion = (originCoords, destinationCoords) => {
  const allCoordinates = [originCoords, destinationCoords];
  console.log('ALLCOORDS', allCoordinates);
  if (!allCoordinates.length) return;

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

export {showError, showSuccess, getFare, calculateRegion};
