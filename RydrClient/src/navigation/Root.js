import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  AppState,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {Auth, Hub} from 'aws-amplify';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomDrawer from './CustomDrawer';
import {colors} from '../shared/common/styles/';
import {AuthStackScreen} from './AuthNavigator';
import {useAppSelector, useAppDispatch} from '../store/app/hooks';
import {
  ProfileStackScreen,
  TripsScreenStack,
  WalletScreenStack,
  HelpScreenStack,
  SettingsScreenStack,
  FavoritesScreenStack,
} from './ProfileNavgator';
import {Navigator} from './Navigator';
import {setProfile} from '../store/features/riders/rider-slice';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const RootNavigator = props => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const DEVICE_WIDTH = useWindowDimensions().width;

  //States
  const {order, isOrderActive} = useAppSelector(state => state.orderState);
  const {profile} = useAppSelector(state => state.rider);
  const {
    origin,
    destination,
    mapViewBoundariesForCoords,
    currentLatitude,
    currentLongitude,
  } = useAppSelector(state => state.mapState);
  const {car} = useAppSelector(state => state.driver);
  const {drivers} = useAppSelector(state => state.drivers);

  //HANDLE APP STATE
  const handleAppStateChange = newState => {
    setAppState(newState);
  };

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      const {attributes} = authUser;
      dispatch(setProfile(attributes));
    } catch (e) {
      dispatch(setProfile(null));
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    if (appState === 'inactive') {
    }
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (profile === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      {profile ? (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerPosition: 'left',
          }}
          drawerStyle={{
            padding: 0,
            margin: 0,
            backgroundColor: colors.softwhite,
            width: DEVICE_WIDTH - 100,
          }}
          drawerContentOptions={{
            activeTintColor: colors.darkBlue,
            labelStyle: {
              color: colors.darkText,
            },
            itemStyle: {
              width: DEVICE_WIDTH,
              paddingVertical: 10,
              marginVertical: 0,
              paddingHorizontal: 0,
            },
          }}
          drawerContent={prop => {
            const filteredProps = {
              ...prop,
              state: {
                ...prop.state,
                routeNames: prop.state.routeNames.filter(
                  // To hide single option
                  // (routeName) => routeName !== 'HiddenPage1',
                  // To hide multiple options you can add & condition
                  routeName => {
                    routeName !== 'MyProfile';
                  },
                ),
                routes: prop.state.routes.filter(
                  route => route.name !== 'MyProfile',
                ),
              },
            };
            return <CustomDrawer {...filteredProps} />;
          }}>
          <Drawer.Screen
            name="HomeNavigator"
            component={Navigator}
            options={{
              drawerIcon: () => (
                <AntDesign
                  name="home"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
              style: {
                width: DEVICE_WIDTH - 100,
              },
              drawerLabel: 'Get a Ride!',
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="MyTrips"
            component={TripsScreenStack}
            options={{
              drawerIcon: () => (
                <Entypo
                  name="back-in-time"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
              drawerLabel: 'My Trips',
              style: {
                width: DEVICE_WIDTH - 100,
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Favorites"
            component={FavoritesScreenStack}
            options={{
              drawerIcon: () => (
                <Entypo
                  name="heart"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
              drawerLabel: 'My Favorites',
              style: {
                width: DEVICE_WIDTH - 100,
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Wallet"
            component={WalletScreenStack}
            options={{
              drawerIcon: () => (
                <AntDesign
                  name="wallet"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
              drawerLabel: 'Wallet',
              style: {
                width: DEVICE_WIDTH - 100,
              },
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="Help"
            component={HelpScreenStack}
            options={{
              drawerIcon: () => (
                <AntDesign
                  name="questioncircleo"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
              drawerLabel: 'Help',
              style: {
                width: DEVICE_WIDTH - 100,
              },
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="Settings"
            component={SettingsScreenStack}
            options={{
              drawerIcon: () => (
                <AntDesign
                  name="setting"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
              drawerLabel: 'Settings',
              style: {
                width: DEVICE_WIDTH - 100,
              },
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="MyProfile"
            component={ProfileStackScreen}
            options={{
              title: 'My Profile',
              style: {
                width: DEVICE_WIDTH - 100,
              },
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <>
          <Drawer.Navigator
            initialRouteName="AuthStackScreens"
            screenOptions={{
              headerShown: false,

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
            <Drawer.Screen name="AuthStack" component={AuthStackScreen} />
          </Drawer.Navigator>
        </>
      )}
    </>
  );
};

export default RootNavigator;
