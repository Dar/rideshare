import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import { onOrderUpdated } from '../../../graphql/subscriptions'; // Subscription
import { updateOrder } from '../../../graphql/mutations'; // Example mutation

interface Order {
  id: string;
  origin: string;
  destination: string;
  status: string | null;
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

// Action to update the order state
const updateOrderState = createAsyncThunk(
  'order/updateOrder',
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const result = await API.graphql(
        graphqlOperation(updateOrder, { input: orderData })
      );
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to handle subscription to order updates
export const subscribeToOrderUpdates = createAsyncThunk(
  'order/subscribeToOrderUpdates',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const subscription = (API.graphql(
        graphqlOperation(onOrderUpdated)
      ) as any).subscribe({
        next: ({ value }: any) => {
          const updatedOrder = value?.data?.onOrderUpdated;
          if (updatedOrder) {
            dispatch(setOrder(updatedOrder));
          }
        },
        error: (error: any) => {
          console.error('Subscription error:', error);
        },
      });

      // Return the unsubscribe function
      return () => subscription.unsubscribe();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
    clearOrderState(state) {
      state.order = null;
      state.isLoading = false;
      state.errors = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateOrderState.fulfilled, (state, action: PayloadAction<any>) => {
        state.order = action.payload;
      })
      .addCase(subscribeToOrderUpdates.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const { setOrder, clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
