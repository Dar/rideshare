import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {API, graphqlOperation} from 'aws-amplify';
import {GraphQLResult, GraphQLQuery} from '@aws-amplify/api';
import {getDriver, getOrder, listOrders} from '../../../graphql/queries';
import {GetDriverQuery, GetOrderQuery, ListOrdersQuery} from '../../../API';
import {createOrder} from '../../../graphql/mutations';

type Orders = {
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

interface OrdersState {
  ordersdata: Orders[];
  modalVisible?: boolean;
  loadStatus?: string;
  error?: null;
  limit?: number;
}

const initialState: OrdersState = {
  ordersdata: [],
  modalVisible: false,
  loadStatus: 'idle',
  error: null,
  limit: 5,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, {getState, rejectWithValue}) => {
    const limit = getState() as {ordersdata: OrdersState};
    try {
      const orderData = await API.graphql<GraphQLQuery<ListOrdersQuery>>(
        graphqlOperation(listOrders, {filter: {status: {eq: 'NEW'}}}),
      );
      return orderData?.data?.listOrders?.items;
    } catch (e) {
      return rejectWithValue(e.response?.data ?? e.message ?? 'Unknown error');
    }
  },
);

const ordersSlice = createSlice({
  name: 'ordersState',
  initialState,
  reducers: {
    updateOrderList(state, action: PayloadAction<any>): void {
      state.ordersdata = action.payload.slice(1);
    },
    setModalVisible(state, action: PayloadAction<any>): void {
      state.modalVisible = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    addNewOrderToList(state, action: PayloadAction<any>): void {
      state.ordersdata = [...state.ordersdata, action.payload];
    },
    clearOrdersState(state) {
      state.ordersdata = [];
      state.modalVisible = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loadStatus = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadStatus = 'succeeded';
        state.ordersdata = [...action.payload];
      })
      .addCase(fetchOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loadStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  updateOrderList,
  setModalVisible,
  clearOrdersState,
  addNewOrderToList,
} = ordersSlice.actions;

export default ordersSlice.reducer;
