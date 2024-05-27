import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import SearchRow from '../../components/SearchRow/SearchRow';
import {GOOGLE_API_KEY} from '../../constants';
import TripDirectory from '../../components/TripDirectory';
import {colors, transparentColor} from '../../shared/common/styles/';
import screen_styles from './styles';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {
  setOrigin,
  setDestination,
  clearMapState,
  setDistance,
  setDuration,
  setTripCoordinates,
} from '../../store/features/map/map-slice';
// import {
//   LATITUDE_HOME,
//   LONGITUDE_HOME,
//   LATITUDE_WORK,
//   LONGITUDE_WORK,
// } from '../../shared/position';

// const homePlace = {
//   description: 'Home',
//   geometry: {location: {lat: LATITUDE_HOME, lng: LONGITUDE_HOME}},
// };

// const workPlace = {
//   description: 'Work',
//   geometry: {location: {lat: LATITUDE_WORK, lng: LONGITUDE_WORK}},
// };

const MapSearchScreen = props => {
  const navigation = useNavigation();
  const ref = useRef();

  const {currentAddress, origin, destination} = useAppSelector(
    state => state.mapState,
  );

  const dispatch = useAppDispatch();

  const checkNavigation = () => {
    navigation.navigate('MapSearchResultsScreen');
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(clearMapState());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (
      isMounted &&
      Object.keys(origin).length &&
      Object.keys(destination).length
    ) {
      checkNavigation();
    }

    return () => {
      isMounted = false;
    };
  }, [origin, destination]);

  return (
    <View style={screen_styles.container}>
      <View style={screen_styles.wrapper}>
        <View style={screen_styles.searchFieldsContainer}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={currentAddress ? currentAddress : 'Where from?'}
            onPress={(data, details = null) => {
              dispatch(setOrigin({data, details}));
            }}
            setAddressText={currentAddress}
            debounce={500}
            enablePoweredByContainer={false}
            suppressDefaultStyles
            currentLocation={false}
            currentLocationLabel="Current location"
            textInputProps={{
              placeholderTextColor: colors.darkText,
              returnKeyType: 'search',
            }}
            styles={{
              textInputContainer: screen_styles.textInputContainer,
              textInput: screen_styles.textInput,
              container: screen_styles.autocompleteContainer,
              listView: screen_styles.listView,
              separator: screen_styles.separator,
            }}
            fetchDetails
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:CA',
            }}
            renderDescription={data => data.description || data.vicinity}
            renderRow={data => <SearchRow data={data} />}
            listEmptyComponent={
              <View style={screen_styles.noResults}>
                <Text style={screen_styles.noResultsText}>
                  No results were found
                </Text>
              </View>
            }
          />

          <GooglePlacesAutocomplete
            placeholder="Where are you going?"
            onPress={(data, details = null) => {
              dispatch(setDestination({data, details}));
            }}
            debounce={500}
            enablePoweredByContainer={false}
            currentLocation={false}
            suppressDefaultStyles
            textInputProps={{
              placeholderTextColor: colors.darkText,
              returnKeyType: 'search',
            }}
            styles={{
              textInput: screen_styles.textInput,
              container: {
                ...screen_styles.autocompleteContainer,
                textInput: screen_styles.textInput,
                top: 55,
              },
              separator: screen_styles.separator,
            }}
            fetchDetails
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:CA',
            }}
            renderRow={data => <SearchRow data={data} />}
            listEmptyComponent={
              <View style={screen_styles.noResults}>
                <Text style={screen_styles.noResultsText}>
                  No results were found
                </Text>
              </View>
            }
          />
          {/* Circle near Origin input */}
          <View style={screen_styles.circle} />
          {/* Line between dots */}
          <View style={screen_styles.line} />
          {/* Square near Destination input */}
          <View style={screen_styles.square} />
        </View>
        <View style={screen_styles.bottomSheetContainer}>
          <TripDirectory />
        </View>
      </View>
    </View>
  );
};

export default MapSearchScreen;
