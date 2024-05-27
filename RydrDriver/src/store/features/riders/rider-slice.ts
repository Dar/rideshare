import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Auth, Hub} from 'aws-amplify';
import {API, graphqlOperation} from 'aws-amplify';
import {GraphQLResult} from '@aws-amplify/api';
import {Rider} from './interface';

export interface AuthState {
  profile?: Rider;
  user?: object;
  isLoading: boolean;
  errors: any;
}

const initialState: AuthState = {
  profile: {
    id: '',
    username: '',
    phone_number_verified: false,
    email_verified: false,
    family_name: '',
    given_name: '',
    phone_number: '',
    email: '',
    orders: [],
  },
  user: {},
  isLoading: false,
  errors: null,
};

const riderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>): void {
      state.profile = {...action.payload};
    },
    setUser(state, action: PayloadAction<any>): void {
      state.user = Object.assign({}, action.payload);
    },
  },
});

export const {setProfile, setUser} = riderSlice.actions;

export default riderSlice.reducer;
