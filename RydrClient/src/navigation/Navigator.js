import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import MapSearchScreen from '../screens/MapSearchScreen';
import MapSearchResultsScreen from '../screens/MapSearchResultsScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import NavigationDrawerStructure from './NavigatorDrawerStructure';
import {colors} from '../shared/common/styles/';
import {useAppSelector} from '../store/app/hooks';

const Stack = createStackNavigator();

export const Navigator = props => {
  const navigation = useNavigation();
  const {order, isOrderActive} = useAppSelector(state => state.orderState);

  return (
    <Stack.Navigator
      initialRouteName={
        order?.status === 'NEW' || order?.status === 'PICKING_UP_CLIENT'
          ? 'Orders'
          : 'Home'
      }
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.darkBlue,
          shadowColor: colors.lightblack, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.softwhite,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.softwhite,
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
            title: 'Home',
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name={'MapSearchScreen'}
          component={MapSearchScreen}
          options={{
            title: 'Search Location',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name={'MapSearchResultsScreen'}
          options={{
            title: 'Search Results',
            headerShown: true,
            headerBackTitle: 'Back',
          }}
          component={MapSearchResultsScreen}
        />

        <Stack.Screen
          name={'Orders'}
          options={{
            title: 'Ride Order',
            headerShown: true,
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
          }}
          component={OrderScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
