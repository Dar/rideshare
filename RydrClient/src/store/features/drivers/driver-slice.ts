import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {API, graphqlOperation} from 'aws-amplify';
import {GraphQLResult, GraphQLSubscription} from '@aws-amplify/api';
import {Driver} from './interface';
import {GetDriverQuery, OnDriverUpdatedSubscription} from '../../../API';
import {onDriverUpdated} from '../../../graphql/subscriptions';
import {getDriver} from '../../../graphql/queries';
import debounce from 'lodash/debounce';
export interface DriverState {
  car?: Driver;
  isLoading: boolean;
  errors: any;
}

const initialState: DriverState = {
  car: {
    id: '',
    type: '',
    given_name: '',
    family_name: '',
    phone_number: '',
    isActive: false,
    currentLat: 0,
    currentLng: 0,
    heading: 0,
    orders: [],
  },
  isLoading: false,
  errors: null,
};

export const getCar = createAsyncThunk(
  'driver/getOrderDriver',
  async (data, {rejectWithValue}) => {
    try {
      const carData = (await API.graphql(
        graphqlOperation(getDriver, {id: data}),
      )) as GraphQLResult<GetDriverQuery>;

      const driverAttributes = {
        id: carData?.data?.getDriver?.id,
        type: carData?.data?.getDriver?.type,
        given_name: carData?.data?.getDriver?.given_name,
        family_name: carData?.data?.getDriver?.family_name,
        phone_number: carData?.data?.getDriver?.phone_number,
        isActive: carData?.data?.getDriver?.isActive,
        currentLat: carData?.data?.getDriver?.currentLat,
        currentLng: carData?.data?.getDriver?.currentLng,
        heading: carData?.data?.getDriver?.heading,
      };
      return driverAttributes;
    } catch (e) {
      console.log(e.response.data);
      rejectWithValue(e.response.data);
    }
  },
);

export const driverSubscriptionUpdate = createAsyncThunk(
  'driver/updatedDriverSubscription',
  (data, {rejectWithValue}) => {
    const debouncedSubscription = debounce(() => {
      const subscription = API.graphql<
        GraphQLSubscription<OnDriverUpdatedSubscription>
      >(graphqlOperation(onDriverUpdated, {id: data})).subscribe({
        next: ({value}) => {
          const driverAttributes = {
            id: value?.data?.onDriverUpdated?.id,
            type: value?.data?.onDriverUpdated?.type,
            given_name: value?.data?.onDriverUpdated?.given_name,
            family_name: value?.data?.onDriverUpdated?.family_name,
            phone_number: value?.data?.onDriverUpdated?.phone_number,
            isActive: value?.data?.onDriverUpdated?.isActive,
            currentLat: value?.data?.onDriverUpdated?.currentLat,
            currentLng: value?.data?.onDriverUpdated?.currentLng,
            heading: value?.data?.onDriverUpdated?.heading,
          };
          console.log('DRIVER ATTR', driverAttributes);
          return driverAttributes;
        },
        error: (error: any) => {
          console.log('ERROR', error.response.data);
          rejectWithValue(error.response.data);
        },
      });
      return () => subscription.unsubscribe();
    }, 1000);

    return debouncedSubscription();
  },
);

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    clearDriverState(state: any): void {
      state.car = null;
    },
    setCar(state: any, action: PayloadAction<any>): void {
      state.car = action.payload;
    },
    updateDriverLocation(state, action) {
      const {currentLat, currentLng, heading} = action.payload;
      if (state.car) {
        console.log('updateDriverLocation', currentLat, currentLng, heading);
        state.car.currentLat = currentLat;
        state.car.currentLng = currentLng;
        state.car.heading = heading;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getCar.fulfilled, (state, action: PayloadAction<any>) => {
      state.car = action.payload;
    });
    builder.addCase(
      driverSubscriptionUpdate.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.car = action.payload;
      },
    );
  },
});
export const {clearDriverState, setCar, updateDriverLocation} =
  driverSlice.actions;
export default driverSlice.reducer;
