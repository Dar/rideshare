import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mapsReducer from '../features/map/map-slice';
import driverReducer from '../features/driver/driver-slice';
import orderReducer from '../features/order/order-slice';
import riderReducer from '../features/riders/rider-slice';
import ordersReducer from '../features/order/orders-slice';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  mapState: mapsReducer,
  driver: driverReducer,
  user: riderReducer,
  orderState: orderReducer,
  ordersState: ordersReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Original from https://redux-toolkit.js.org/tutorials/advanced-tutorial
// export const store = configureStore({
//     reducer: {
//       map: mapReducer,
//       [mapsApiSLice.reducerPath]: mapsApiSLice.reducer,
//     },
//     middleware: getDefaultMiddleware => {
//       return getDefaultMiddleware().concat(mapsApiSLice.middleware);
//     },
//   });
