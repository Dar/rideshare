import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  AppState,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './CustomDrawer';
import {colors} from '../shared/common/styles/';
import {ProfileStackScreen} from './ProfileNavgator';
import {Navigator} from './Navigator';
import TermsAndConditions from '../screens/TermsAndConditions/TermsAndConditions';
import NavigationDrawerStructure from './NavigatorDrawerStructure';
import {Auth, Hub} from 'aws-amplify';
import {useAppSelector, useAppDispatch} from '../store/app/hooks';
import {AuthStackScreen} from './AuthNavigator';
import {setAuth} from '../store/features/driver/driver-slice';
import SessionHandler from '../shared/auth/SessionHandler';

const Drawer = createDrawerNavigator();

const RootNavigator = props => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const DEVICE_WIDTH = useWindowDimensions().width;
  const {authUser} = useAppSelector(state => state.driver);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      const {attributes} = authUser;
      dispatch(setAuth(attributes));
    } catch (e) {
      dispatch(setAuth(null));
    }
  };

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

  if (authUser === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      {authUser ? (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerPosition: 'left',
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 0}},
              close: {animation: 'timing', config: {duration: 0}},
            },
          }}
          drawerStyle={{
            padding: 0,
            margin: 0,
            backgroundColor: colors.themeColor,
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
          drawerContent={props => {
            const filteredProps = {
              ...props,
              state: {
                ...props.state,
                routeNames: props.state.routeNames.filter(
                  // To hide single option
                  // (routeName) => routeName !== 'HiddenPage1',
                  // To hide multiple options you can add & condition
                  routeName => {
                    routeName !== 'MyProfile';
                  },
                ),
                routes: props.state.routes.filter(
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
              drawerLabel: 'Start Driving',
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="Terms And Conditions"
            component={TermsAndConditions}
            options={{
              drawerIcon: () => (
                <Ionicons
                  name="document-text-outline"
                  color={colors.darkBlue}
                  styles={{marginLeft: 0}}
                  size={24}
                />
              ),
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
              headerLeft: () => (
                <NavigationDrawerStructure navigationProps={navigation} />
              ),
              style: {
                width: DEVICE_WIDTH - 100,
              },
              label: 'Terms and Conditions',
              headerShown: true,
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
        <Drawer.Navigator
          initialRouteName="AuthStack"
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
      )}
    </>
  );
};

export default RootNavigator;
