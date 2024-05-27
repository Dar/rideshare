import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {API, graphqlOperation} from 'aws-amplify';
import {GraphQLResult} from '@aws-amplify/api';
import {getDriver, getOrder} from '../../../graphql/queries';
import {GetDriverQuery, GetOrderQuery} from '../../../API';
import {createOrder} from '../../../graphql/mutations';

type Order = {
  id: string;
  origin: string;
  destination: string;
  originAddress: string;
  destinationAddress: string;
  userId: string;
  driverId: string;
  type: string;
  status: string;
  designate: string;
  passengerNumber: string;
  paymentType: string;
  notes: string;
  fare: number;
};

interface OrderState {
  ordersdata: Order[];
}

const initialState: OrderState = {
  ordersdata: [],
};

// export const fetchOrder = createAsyncThunk(
//   'drivers/fetchOrder',
//   async (data, {rejectWithValue}) => {
//     try {
//       const orderData = (await API.graphql(
//         graphqlOperation(getOrder, {id: route?.params.id}),
//       )) as GraphQLResult<GetOrderQuery>;

//       return orderData?.data?.getOrder;
//     } catch (e) {
//         rejectWithValue(e.response.data);
//     }
//   },
// );

export const onFormSubmit = createAsyncThunk(
  'orders/onFormSubmit',
  async (data, {rejectWithValue}) => {
    const response = await API.graphql(
      graphqlOperation(createOrder, {
        input: data,
      }),
    );
    return response;
  },
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (data, {rejectWithValue}) => {
    try {
      const orderData = (await API.graphql(
        graphqlOperation(getOrder, {id: data}),
      )) as GraphQLResult<GetOrderQuery>;
      return orderData?.data?.getOrder;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  },
);

export const fetchCar = createAsyncThunk(
  'drivers/fetchOrderCar',
  async (data, {rejectWithValue}) => {
    try {
      const carData = (await API.graphql(
        graphqlOperation(getDriver, {id: data}),
      )) as GraphQLResult<GetDriverQuery>;
      return carData?.data?.getDriver;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersState(state) {
      state.ordersdata = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCar.fulfilled, (state, action: PayloadAction<any>) => {
      state.ordersdata[0].driverId = action.payload;
    });
    builder.addCase(
      fetchOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.ordersdata = [{...action.payload}];
      },
    );
    builder.addCase(
      onFormSubmit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.ordersdata.push(action.payload);
      },
    );
  },
});
export const {clearOrdersState} = ordersSlice.actions;
export default ordersSlice.reducer;

// setOrder
// setCar
