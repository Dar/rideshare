import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '@env';

// Initialize Geocoder with your Google Maps API key
Geocoder.init(GOOGLE_API_KEY);

const getPlaceDetails = async placeId => {
  try {
    // Use the Geocoder library to fetch details using place_id
    const response = await Geocoder.fromPlaceId(placeId);
    const {results} = response;

    if (results.length > 0) {
      const place = results[0];
      const {formatted_address, geometry} = place;
      const {location} = geometry;
      const {lat, lng} = location;

      // Return the details
      return {
        address: formatted_address,
        latitude: lat,
        longitude: lng,
      };
    } else {
      throw new Error('Place not found');
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

// Example usage:
const placeId = 'YOUR_PLACE_ID';
getPlaceDetails(placeId)
  .then(details => {
    console.log('Place details:', details);
  })
  .catch(error => {
    console.error('Error:', error);
  });
