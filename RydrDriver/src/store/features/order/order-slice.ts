import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {GraphQLResult, GraphQLQuery} from '@aws-amplify/api';
import {getOrder, listOrders, ordersByDriverId} from '../../../graphql/queries';
import {
  GetOrderQuery,
  ListOrdersQuery,
  OrdersByDriverIdQuery,
  UpdateOrderMutation,
} from '../../../API';
import {createOrder, updateOrder} from '../../../graphql/mutations';

interface Order {
  id: string;
  origin: string;
  destination: string;
  originAddress: string;
  destinationAddress: string;
  userId: string;
  userName: string;
  driverId: string;
  type: string;
  fare: number;
  status: string | null;
  designate: string;
  passengerNumber: string;
  paymentType: string;
  notes: string;
  pickupTime?: string;
  dropoffTime?: string;
  isFinisihed?: boolean;
}

export interface OrderState {
  order?: Order | null;
  isLoading: boolean;
  errors: any;
}

const initialState: OrderState = {
  order: null,
  isLoading: false,
  errors: null,
};

export const setOrder = createAsyncThunk(
  'order/setOrder',
  async (data: any, {rejectWithValue}) => {
    try {
      const orderData = await API.graphql<GraphQLQuery<UpdateOrderMutation>>(
        graphqlOperation(updateOrder, {
          input: {
            ...data,
          },
        }),
      );
      return orderData?.data?.updateOrder;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  },
);

export const getActiveOrder = createAsyncThunk(
  'order/getActiveOrder',
  async (_: any, {rejectWithValue}) => {
    const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

    try {
      const orderData = await API.graphql<GraphQLQuery<OrdersByDriverIdQuery>>(
        graphqlOperation(ordersByDriverId, {
          driverId: authUser.attributes.sub,
          filter: {status: {eq: 'PICKING_UP_CLIENT'}},
        }),
      );
      return orderData?.data?.ordersByDriverId?.items[0] || null;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  },
);

const orderSlice = createSlice({
  name: 'orderState',
  initialState,
  reducers: {
    setOrderState(state, action: PayloadAction<any>) {
      if (state.order) {
        state.order.status = action.payload;
      }
    },
    setOrderStatus(state, action: PayloadAction<any>) {
      if (state.order) {
        state.order.status = action.payload;
      }
    },
    clearOrderState(state) {
      state.order = null;
      state.isLoading = false;
      state.errors = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(setOrder.fulfilled, (state, action: PayloadAction<any>) => {
      state.order = action.payload;
    });
    builder.addCase(
      getActiveOrder.pending,
      (state, action: PayloadAction<any>) => {
        state.order = action.payload;
        state.isLoading = true;
      },
    );
    builder.addCase(
      getActiveOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.order = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(
      getActiveOrder.rejected,
      (state, action: PayloadAction<any>) => {
        state.order = null;
        state.errors = action.payload;
        state.isLoading = true;
      },
    );
  },
});

export const {clearOrderState, setOrderState, setOrderStatus} =
  orderSlice.actions;

export default orderSlice.reducer;
