import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mapsReducer from '../features/map/map-slice';
import driverReducer from '../features/drivers/driver-slice';
import driversReducer from '../features/drivers/drivers-slice';
import orderReducer from '../features/order/order-slice';
import ordersReducer from '../features/order/orders-slice';
import riderReducer from '../features/riders/rider-slice';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  mapState: mapsReducer,
  driver: driverReducer,
  drivers: driversReducer,
  orderState: orderReducer,
  orderStates: ordersReducer,
  rider: riderReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
