import React from 'react';
import {View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import NewPasswordScreen from '../screens/Profile/NewPasswordScreen';
import {colors} from '../shared/common/styles/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationDrawerStructure from './NavigatorDrawerStructure';

const ProfileStack = createStackNavigator();

const headerConfig = {
  headerTintColor: colors.softwhite, //Set Header text color
  headerStyle: {
    backgroundColor: colors.darkBlue,
  },
  headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
  },
};

export const ProfileStackScreen = props => {
  const navigation = useNavigation();

  const openMenuDrawer = () => {};

  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        ...headerConfig,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
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
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true,
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.darkBlue}
                color={colors.themeColor}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Ionicons
                name="ios-menu"
                size={25}
                color={colors.themeColor}
                backgroundColor={colors.darkBlue}
                onPress={() => {
                  openMenuDrawer();
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.darkBlue}
                color={colors.themeColor}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={{
          title: 'New Password',
          headerBackTitle: 'Back',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Ionicons
                name="ios-menu"
                size={25}
                color={colors.themeColor}
                backgroundColor={colors.darkBlue}
                onPress={() => {
                  openMenuDrawer();
                }}
              />
            </View>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};
