import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import NavigationDrawerStructure from './NavigatorDrawerStructure';
import {colors} from '../shared/common/styles/';
import {useAppSelector, useAppDispatch} from '../store/app/hooks';

const Stack = createStackNavigator();

export const Navigator = props => {
  const navigation = useNavigation();
  const {
    currentLatitude,
    currentLongitude,
    heading,
    latitudeDelta,
    longitudeDelta,
    currentAddress,
    distance,
    duration,
    origin,
    destination,
    latitude,
    longitude,
    routeCoordinates,
    distanceTravelled,
    prevLatLng,
  } = useAppSelector(state => state.mapState);

  //get ORDERS
  const {ordersdata, modalVisible, limit} = useAppSelector(
    state => state.ordersState,
  );

  //get ORDER
  const {order} = useAppSelector(state => state.orderState);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.darkBlue,
          shadowColor: colors.lightblack, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.themeColor,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.themeColor,
        },
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
        transitionSpec: {
          open: {animation: 'timing', config: {duration: 0}},
          close: {animation: 'timing', config: {duration: 0}},
        },
      }}>
      <Stack.Group name={'MainGroup'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: !order ? 'Waiting for orders...' : 'Order in progress ',
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
