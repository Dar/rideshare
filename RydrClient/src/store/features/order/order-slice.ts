import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {API, graphqlOperation} from 'aws-amplify';
import {
  GraphQLResult,
  GraphQLQuery,
  GraphQLSubscription,
} from '@aws-amplify/api';
import {getDriver, getOrder, ordersByUserId} from '../../../graphql/queries';
import {
  GetDriverQuery,
  GetOrderQuery,
  OnOrderUpdatedSubscription,
  UpdateOrderMutation,
} from '../../../API';
import {createOrder, updateOrder} from '../../../graphql/mutations';
import {onOrderUpdated} from '../../../graphql/subscriptions';

interface Order {
  id: string;
  origin: string;
  destination: string;
  originAddress: string;
  destinationAddress: string;
  userId: string;
  driverId: string | null;
  type: string;
  fare: number;
  status: string;
  designate: string;
  passengerNumber: string;
  paymentType: string;
  notes: string;
  scheduleDate: string;
  pickupTime?: string;
  dropoffTime?: string;
}

export interface OrderState {
  order?: Order | null;
  isOrderLoading: boolean;
  isOrderActive?: boolean;
  errors: any;
}

const initialState: OrderState = {
  order: null,
  isOrderActive: false,
  isOrderLoading: false,
  errors: null,
};

export const onOrderSubmit = createAsyncThunk(
  'order/onOrderSubmit',
  async (data, {rejectWithValue}) => {
    await API.graphql(
      graphqlOperation(createOrder, {
        input: data,
      }),
    );
    return data;
  },
);

export const getActiveOrder = createAsyncThunk(
  'order/getActiveOrder',
  async (data, {rejectWithValue}) => {
    try {
      const orderData = await API.graphql<GraphQLQuery<GetOrderQuery>>(
        graphqlOperation(getOrder, {filter: {userId: {eq: data}}}),
      );
      return orderData?.data?.getOrder;
    } catch (e) {
      return rejectWithValue(e.response?.data ?? e.message ?? 'Unknown error');
    }
  },
);

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (data, {rejectWithValue}) => {
    console.log('FETCH ORDER', data);
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

export const updateActiveOrder = createAsyncThunk(
  'order/updateOrder',
  async ({id, ...data}: {id: string; data: any}, {rejectWithValue}) => {
    try {
      const updatedOrderData = await API.graphql<
        GraphQLQuery<UpdateOrderMutation>
      >(
        graphqlOperation(updateOrder, {
          input: {
            id: id,
            ...data,
          },
        }),
      );
      return updatedOrderData?.data?.updateOrder;
    } catch (e) {
      console.log('ERROR', JSON.stringify(e));
      rejectWithValue(e);
    }
  },
);

export const getOrderByUserIdAndStatus = createAsyncThunk(
  'orders/getOrderByUserIdAndStatus',
  async (
    { userId, status }: { userId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const result = (await API.graphql(
        graphqlOperation(ordersByUserId, {
          userId,
          filter: { status: { eq: status } },
          limit: 1,
        })
      )) as GraphQLResult<{ ordersByUserId: { items: Order[] } }>;

      // Return the first order if it exists; otherwise, return null
      return result.data?.ordersByUserId?.items?.[0] || null;
    } catch (error) {
      console.error('Error fetching order by userId and status:', error);
      return rejectWithValue(
        error?.response?.data || error.message || 'An unknown error occurred'
      );
    }
  }
);


const orderSlice = createSlice({
  name: 'orderState',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<Order>): void {
      state.order = action.payload;
    },
    setOrderState(state, action: PayloadAction<any>) {
      if (state.order) {
        state.order.status = action.payload;
      }
    },
    updateOrderData(state, action: PayloadAction<any>): void {
      state.order = {...state.order, ...action.payload};
    },
    setOrderActive(state, action: PayloadAction<boolean>): void {
      state.isOrderActive = action.payload;
    },

    clearOrderState(state): void {
      state.order = {
        id: '',
        origin: '',
        destination: '',
        originAddress: '',
        destinationAddress: '',
        userId: '',
        driverId: null,
        type: 'Standard',
        fare: 0.0,
        status: '',
        designate: '',
        passengerNumber: '',
        paymentType: '',
        notes: '',
        scheduleDate: '',
        pickupTime: '',
        dropoffTime: '',
      };
      state.errors = null;
      state.isOrderActive = false;
      state.isOrderLoading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.order = action.payload;
      },
    );
    builder.addCase(
      onOrderSubmit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state = action.payload;
      },
    );
    builder
      .addCase(updateActiveOrder.pending, state => {
        state.isOrderLoading = true;
      })
      .addCase(
        updateActiveOrder.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isOrderLoading = false;
          state.order = action.payload;
        },
      )
      .addCase(
        updateActiveOrder.rejected,
        (state, action: PayloadAction<any>) => {
          state.isOrderLoading = false;
          state.isOrderActive = false;
          state.errors = action.payload;
        },
      );

    builder
      .addCase(getActiveOrder.pending, state => {
        state.isOrderActive = false;
      })
      .addCase(
        getActiveOrder.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.order = {...action.payload};
          state.isOrderActive = true;
        },
      )
      .addCase(getActiveOrder.rejected, (state, action: PayloadAction<any>) => {
        state.isOrderActive = false;
        state.errors = action.payload;
      });
    builder
    .addCase(getOrderByUserIdAndStatus.pending, (state) => {
      state.isOrderActive = false;
      state.isOrderLoading = true;
    })
    .addCase(getOrderByUserIdAndStatus.fulfilled, (state, action) => {
      state.order = action.payload; 
      state.isOrderActive = true;
      state.isOrderLoading = false;
    })
    .addCase(getOrderByUserIdAndStatus.rejected, (state, action) => {
      state.isOrderActive = false;
      state.errors = action.payload; 
      state.isOrderLoading = false;
    });
  },
});

export const {setOrder, setOrderState, clearOrderState, setOrderActive, updateOrderData} =
  orderSlice.actions;

export default orderSlice.reducer;
