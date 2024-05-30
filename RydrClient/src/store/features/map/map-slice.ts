import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Dimensions} from 'react-native';
import Geocoder from 'react-native-geocoding';

import {getCurrentLocation} from '../../../shared/helper/helperFunction';
import {GOOGLE_API_KEY} from '@env';

const {width, height} = Dimensions.get('window');

const deltaValue = 0.0122;
interface MapState {
  currentLatitude: number;
  currentLongitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  currentAddress: string;
  origin: object;
  destination: object;
  startCoords: object;
  endCoords: object;
  originAddress: string;
  destinationAddress: string;
  distance: number;
  riderLocation: object;
  duration: number;
  heading: number;
  distanceTravelled: number;
  routeCoordinates: object[];
  tripCoordinates: object[];
  mapViewBoundariesForCoords: object[];
  latitude: number;
  longitude: number;
  prevLatLng: object;
}

const initialState: MapState = {
  currentLatitude: 0,
  currentLongitude: 0,
  currentAddress: '',
  origin: {},
  destination: {},
  startCoords: {},
  endCoords: {},
  latitudeDelta: 0,
  longitudeDelta: 0,
  originAddress: '',
  destinationAddress: '',
  riderLocation: {},
  distance: 0,
  duration: 0,
  heading: 0,
  routeCoordinates: [],
  tripCoordinates: [],
  mapViewBoundariesForCoords: [],
  distanceTravelled: 0,
  latitude: 0,
  longitude: 0,
  prevLatLng: {},
};

export const getLiveLocation = createAsyncThunk(
  'user/currentLocation',
  async (data, thunkApi) => {
    const {
      latitude,
      longitude,
      heading,
    }: {latitude: number; longitude: number; heading: number} =
      await getCurrentLocation();
    return {
      latitude,
      longitude,
      heading,
    };
  },
);

export const getPlaceIdDetails = createAsyncThunk(
  'user/getPlaceIdDetails',
  async (payload: any, thunkAPI) => {
    try {
      const originPlaceId = payload.originData;
      const destinationPlaceId = payload.destinationData;

      const originResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${originPlaceId}&key=${GOOGLE_API_KEY}`,
      );
      const originData = await originResponse.json();

      const destinationResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${destinationPlaceId}&key=${GOOGLE_API_KEY}`,
      );
      const destinationData = await destinationResponse.json();

      return {originData, destinationData};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getCurrentAddress = createAsyncThunk(
  'user/getUserCurrentAddress',
  async ({lat, lng}: {lat: number; lng: number}, {rejectWithValue}) => {
    let addressFormatted = '';

    await Geocoder.from({lat: lat, lng: lng})
      .then(json => {
        addressFormatted = json.results[0]?.formatted_address;
      })
      .catch(error => {
        console.error('Error:', error);
        rejectWithValue(error);
      });
    return addressFormatted || null;
  },
);

const mapsSlice = createSlice({
  name: 'mapState',
  initialState,
  reducers: {
    setOrigin(state, action: PayloadAction<object>) {
      state.origin = action.payload;
    },
    setDestination(state, action: PayloadAction<object>) {
      state.destination = action.payload;
    },
    setStartCoords(state, action: PayloadAction<object>) {
      state.startCoords = action.payload;
    },
    setEndCoords(state, action: PayloadAction<object>) {
      state.endCoords = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setDistance(state, action: PayloadAction<number>) {
      state.distance = action.payload;
    },
    setOriginAddress(state, action: PayloadAction<string>) {
      state.originAddress = action.payload;
    },
    setDestinationAddress(state, action: PayloadAction<string>) {
      state.destinationAddress = action.payload;
    },
    setRegion(state, action: PayloadAction<any>) {
      state = {...state, ...action.payload};
    },
    setDeltas(state, action: PayloadAction<any>) {
      const {latitudeDelta, longitudeDelta} = action.payload;
      state.latitudeDelta = latitudeDelta;
      state.longitudeDelta = longitudeDelta;
    },
    setCurrentPosition(state, action: PayloadAction<any>) {
      const {latitude, longitude, heading} = action.payload;
      state.currentLatitude = latitude;
      state.currentLongitude = longitude;
      state.heading = heading;
    },
    setTripCoordinates(state, action: PayloadAction<any>) {
      state.tripCoordinates = action.payload;
    },
    setMapViewBoundariesForCoords(state, action: PayloadAction<any>) {
      state.mapViewBoundariesForCoords = action.payload;
    },
    setRouteNavigation(state, action: PayloadAction<any>) {
      const {
        latitude,
        longitude,
        routeCoordinates,
        distanceTravelled,
        prevLatLng,
      } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.routeCoordinates = routeCoordinates;
      state.distanceTravelled = distanceTravelled;
      state.prevLatLng = prevLatLng;
    },
    clearMapState(state) {
      state.origin = {};
      state.destination = {};
      state.startCoords = {};
      state.endCoords = {};
      state.originAddress = '';
      state.destinationAddress = '';
      state.routeCoordinates = [];
      state.riderLocation = {};
      state.distance = 0;
      state.duration = 0;
      state.heading = 0;
      state.distanceTravelled = 0;
      state.prevLatLng = {};
      state.latitude = 0;
      state.longitude = 0;
      state.tripCoordinates = [];
      state.mapViewBoundariesForCoords = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getLiveLocation.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.currentLatitude = action.payload.latitude;
        state.currentLongitude = action.payload.longitude;
      },
    );
    builder.addCase(
      getPlaceIdDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state = action.payload;
      },
    );
    builder.addCase(
      getCurrentAddress.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.currentAddress = action.payload;
      },
    );
  },
});

export const {
  setOrigin,
  setDestination,
  setDuration,
  setDistance,
  setOriginAddress,
  setDestinationAddress,
  setRegion,
  setCurrentPosition,
  setDeltas,
  clearMapState,
  setRouteNavigation,
  setTripCoordinates,
  setMapViewBoundariesForCoords,
} = mapsSlice.actions;

export default mapsSlice.reducer;
