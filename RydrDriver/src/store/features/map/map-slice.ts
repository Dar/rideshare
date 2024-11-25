import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import Geocoder from 'react-native-geocoding';
import {getCurrentLocation} from '../../../shared/helper/helperFunction';
import {calculateRadius} from '../../../constants';
interface MapState {
  currentLatitude: number;
  currentLongitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  currentAddress: string;
  origin: object;
  destination: object;
  originAddress: string;
  destinationAddress: string;
  directions: object;
  distance: number;
  riderLocation: object;
  duration: number;
  heading: number;
  distanceTravelled: number;
  routeCoordinates: object[];
  mapViewBoundariesForCoords: object[];
  latitude: number;
  longitude: number;
  region: object | null;
  prevLatLng: object;
  mapStatus: string;
  error: any;
}

const initialState: MapState = {
  currentLatitude: 0,
  currentLongitude: 0,
  currentAddress: '',
  origin: {},
  destination: {},
  latitudeDelta: 0,
  longitudeDelta: 0,
  originAddress: '',
  destinationAddress: '',
  directions: {},
  riderLocation: {},
  distance: 0,
  duration: 0,
  heading: 0,
  routeCoordinates: [],
  mapViewBoundariesForCoords: [],
  distanceTravelled: 0,
  region: null,
  latitude: 0,
  longitude: 0,
  prevLatLng: {},
  mapStatus: '',
  error: null,
};

export const getLiveLocation = createAsyncThunk(
  'user/currentLocation',
  async () => {
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
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${originPlaceId}&key=${process.env.GOOGLE_API_KEY}`,
      );
      const originData = await originResponse.json();

      const destinationResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${destinationPlaceId}&key=${process.env.GOOGLE_API_KEY}`,
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
        // console.log('json', JSON.stringify(json));
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
    setStatus(state, action: PayloadAction<any>) {
      state.mapStatus = action.payload;
    },
    setDeltas(state, action: PayloadAction<any>) {
      state.latitudeDelta = action.payload.latitudeDelta;
      state.longitudeDelta = action.payload.longitudeDelta;
    },
    setRegion(state, action: PayloadAction<any>) {
      state.region = action.payload;
    },
    updateMovement(state, action: PayloadAction<any>) {
      const {lat, lng} = action.payload;
      state.currentLatitude = lat;
      state.currentLongitude = lng;
    },
    setCurrentPosition(state, action: PayloadAction<any>) {
      const {latitude, longitude, heading} = action.payload;
      const prevLatitude = state.currentLatitude;
      const prevLongitude = state.currentLongitude;
      if (
        prevLatitude !== null &&
        prevLatitude !== latitude &&
        prevLongitude !== null &&
        prevLongitude !== longitude
      ) {
        // Calculate distance between previous and current coordinates
        const distance = calculateRadius(
          prevLatitude,
          prevLongitude,
          latitude,
          longitude,
        );

        //update state after distance is greate than 10 meters to it only runs in that interval
        if (distance > 10) {
          state.currentLatitude = latitude;
          state.currentLongitude = longitude;
          state.heading = heading;
        }
      }
    },

    setMapViewBoundariesForCoords(state, action: PayloadAction<any>) {
      state.mapViewBoundariesForCoords = action.payload;
    },
    setRouteNavigation(state, action: PayloadAction<any>) {
      state.routeCoordinates = action.payload;
    },
    clearMapState(state) {
      state.origin = {};
      state.destination = {};
      state.originAddress = '';
      state.destinationAddress = '';
      state.routeCoordinates = [];
      state.mapViewBoundariesForCoords = [];
      state.riderLocation = {};
      state.distance = 0;
      state.duration = 0;
      state.heading = 0;
      state.distanceTravelled = 0;
      state.prevLatLng = {};
      state.latitude = 0;
      state.longitude = 0;
      state.mapStatus = '';
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPlaceIdDetails.pending, state => {
        state.mapStatus = 'loading';
      })
      .addCase(
        getPlaceIdDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.mapStatus = 'succeeded';
          state.origin = action.payload.originData.result;
          state.destination = action.payload.destinationData.result;
        },
      )
      .addCase(getPlaceIdDetails.rejected, (state, action) => {
        state.mapStatus = 'failed';
        state.error = action.error.message;
      });
    builder.addCase(
      getLiveLocation.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.currentLatitude = action.payload.latitude;
        state.currentLongitude = action.payload.longitude;
        state.heading = action.payload.heading;
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
  setCurrentPosition,
  updateMovement,
  setDeltas,
  clearMapState,
  setRouteNavigation,
  setMapViewBoundariesForCoords,
  setStatus,
  setRegion,
} = mapsSlice.actions;

export default mapsSlice.reducer;
