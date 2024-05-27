import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Auth, Hub} from 'aws-amplify';
import {API, graphqlOperation} from 'aws-amplify';
import {GraphQLQuery, GraphQLResult} from '@aws-amplify/api';
import {Rider} from './interface';
import {UpdateUserMutation} from '../../../API';
import {updateUser} from '../../../graphql/mutations';
import {PURGE} from 'redux-persist';

export type AuthState = {
  profile?: Rider | null;
  isLoading: boolean;
  errors: any;
};

const initialState: AuthState = {
  profile: {
    id: '',
    username: '',
    phone_number_verified: false,
    email_verified: false,
    currentLat: 0,
    currentLng: 0,
    heading: 0,
    family_name: '',
    given_name: '',
    phone_number: '',
    email: '',
    orders: [],
  },
  isLoading: false,
  errors: null,
};

export const updateActiveUser = createAsyncThunk(
  'driver/updateDriver',
  async (data: any, {rejectWithValue}) => {
    const userData = await Auth.currentAuthenticatedUser();
    try {
      const updatedUserData = await API.graphql<
        GraphQLQuery<UpdateUserMutation>
      >(
        graphqlOperation(updateUser, {
          input: {
            id: userData.attributes.sub,
            ...data,
          },
        }),
      );
      return updatedUserData?.data?.updateUser;
    } catch (e) {
      console.log('ERROR', JSON.stringify(e));
      rejectWithValue(e);
    }
  },
);

const riderSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>): void {
      state.profile = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      updateActiveUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.profile = {...action.payload};
      },
    );
  },
});

export const {setProfile} = riderSlice.actions;

export default riderSlice.reducer;
