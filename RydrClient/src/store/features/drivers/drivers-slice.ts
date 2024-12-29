import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { listDrivers } from '../../../graphql/queries';
import { ListDriversQuery } from '../../../API';
import { Driver } from './interface';
import {
  onCreateDriver,
  onDriverUpdated,
  onUpdateDriver,
} from '../../../graphql/subscriptions';

interface DriverState {
  drivers: Driver[];
}

const initialState: DriverState = {
  drivers: [],
};

export const getActiveCars = createAsyncThunk(
  'drivers/getCurrentDrivers',
  async (data, { rejectWithValue }) => {
    try {
      const response = (await API.graphql(
        graphqlOperation(listDrivers, { filter: { isActive: { eq: true } } })
      )) as GraphQLResult<ListDriversQuery>;
      return response?.data?.listDrivers?.items;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    clearDriversState(state) {
      state.drivers = [];
    },
    setDrivers(state, action: PayloadAction<any>) {
      state.drivers = [...state.drivers, action.payload];
    },
    addDrivers(state, action: PayloadAction<Driver>) {
      const exists = state.drivers.some(
        (driver) => driver.id === action.payload.id
      );
      if (!exists && action.payload.isActive) {
        state.drivers.push(action.payload);
      }
    },
    updateDrivers(state, action: PayloadAction<Driver>) {
      const updateDriverIndex = state.drivers.findIndex(
        (driver) => driver.id === action.payload.id
      );
      if (updateDriverIndex !== -1) {
        state.drivers[updateDriverIndex] = action.payload;
      }
    },
    removeDrivers(state, action: PayloadAction<Driver>) {
      state.drivers = state.drivers.filter(
        (driver) => driver.id !== action.payload.id
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getActiveCars.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.drivers = action.payload.filter((driver) => driver.isActive);
      }
    );
  },
});

export const {
  clearDriversState,
  setDrivers,
  updateDrivers,
  removeDrivers,
  addDrivers,
} = driversSlice.actions;

export default driversSlice.reducer;
