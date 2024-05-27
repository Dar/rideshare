import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LATITUDE, LONGITUDE} from '../../../shared/position';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {GraphQLQuery, GraphQLResult} from '@aws-amplify/api';
import * as mutations from '../../../graphql/mutations';
import {getDriver} from '../../../graphql/queries';
import {GetDriverQuery, UpdateDriverMutation} from '../../../API';
import {updateDriver} from '../../../graphql/mutations';

type Driver = {
  id: string;
  type: string;
  isActive: boolean;
  currentLat: number;
  currentLng: number;
  heading: number;
  orders: object;
};

type AuthUser = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  phone_number: string;
  phone_number_verified: boolean;
  preferred_username: string;
  sub: string;
};

interface DriverState {
  data?: Driver;
  authUser?: AuthUser | null;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: DriverState = {
  data: {
    id: '',
    type: '',
    isActive: false,
    currentLat: 0,
    currentLng: 0,
    heading: 0,
    orders: [],
  },
  authUser: {
    email: '',
    email_verified: true,
    family_name: '',
    given_name: '',
    phone_number: '',
    phone_number_verified: false,
    preferred_username: '',
    sub: '',
  },
  loading: false,
  error: null,
  success: false,
};

export const fetchDriver = createAsyncThunk(
  'driver/fetchDriver',
  async (data, {rejectWithValue}) => {
    try {
      const userData = await Auth.currentAuthenticatedUser({bypassCache: true});
      const driverData = await API.graphql<GraphQLQuery<GetDriverQuery>>(
        graphqlOperation(getDriver, {
          id: userData.attributes.sub,
        }),
      );
      return driverData?.data?.getDriver;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const updateActiveDriver = createAsyncThunk(
  'driver/updateDriver',
  async (data: any, {rejectWithValue}) => {
    const userData = await Auth.currentAuthenticatedUser();
    try {
      const updatedCarData = await API.graphql<
        GraphQLQuery<UpdateDriverMutation>
      >(
        graphqlOperation(updateDriver, {
          input: {
            id: userData.attributes.sub,
            ...data,
          },
        }),
      );
      return updatedCarData?.data?.updateDriver;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const onUserLocationChange = createAsyncThunk(
  'driver/onUserLocationChange',
  async (data: any, {rejectWithValue}) => {
    const userData = await Auth.currentAuthenticatedUser();
    try {
      const updatedCarData = await API.graphql<
        GraphQLQuery<UpdateDriverMutation>
      >(graphqlOperation(updateDriver, {input: {}}));
      return updatedCarData?.data?.updateDriver;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<any>): void {
      state.data = {...state.data, ...action.payload};
    },
    setAuth(state, action: PayloadAction<any>): void {
      state.authUser = action.payload;
    },
    setLoading(state, action: PayloadAction<any>): void {
      state.loading = {...action.payload};
    },
    signOutUser(state) {
      state.authUser = undefined;
    },
    clearDriverState(state: any): void {
      state.data = {
        id: '',
        type: '',
        isActive: false,
        currentLat: 0,
        currentLng: 0,
        heading: 0,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      updateActiveDriver.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(
      fetchDriver.fulfilled,
      (state, {payload}: PayloadAction<any>) => {
        state.data = payload;
      },
    );
    builder.addCase(
      onUserLocationChange.fulfilled,
      (state, {payload}: PayloadAction<any>) => {
        state.data = payload;
      },
    );
  },
});
export const {setAuth, signOutUser, setLoading, setActive, clearDriverState} =
  driverSlice.actions;

export default driverSlice.reducer;
