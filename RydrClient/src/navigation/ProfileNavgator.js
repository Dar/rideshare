import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import NewPasswordScreen from '../screens/Profile/NewPasswordScreen';
import {colors, buttons} from '../shared/common/styles/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationDrawerStructure from './NavigatorDrawerStructure';
import YourTripsScreen from '../screens/Profile/YourTripsScreen';
import WalletScreen from '../screens/Profile/WalletScreen';
import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import AddFavoriteScreen from '../screens/Profile/AddFavoriteScreen';
import YourFavoritesScreen from '../screens/Profile/YourFavoritesScreen';

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
  const ProfileStack = createStackNavigator();
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
      }}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true,
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons
                name="account-edit"
                size={25}
                backgroundColor={colors.darkBlue}
                color={colors.softwhite}
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
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons
                name="account-edit"
                size={25}
                backgroundColor={colors.darkBlue}
                color={colors.softwhite}
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
                color={colors.softwhite}
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

export const TripsScreenStack = props => {
  const TripsStack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <TripsStack.Navigator
      screenOptions={{
        ...headerConfig,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
      }}>
      <TripsStack.Screen
        name="YourTripsScreen"
        options={{
          title: 'My Trips', //Set Header Title
        }}>
        {() => <YourTripsScreen title={'My Trips'} name={'YourTripsScreen'} />}
      </TripsStack.Screen>
    </TripsStack.Navigator>
  );
};

export const FavoritesScreenStack = props => {
  const FavoritesStack = createStackNavigator();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <FavoritesStack.Navigator
      initialRouteName="YourFavoritesScreen"
      screenOptions={{
        ...headerConfig,
      }}>
      <FavoritesStack.Screen
        name="YourFavoritesScreen"
        options={{
          title: 'My Favorites', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}>
        {() => (
          <YourFavoritesScreen title={'My Favorites'} name={'YourFavorites'} />
        )}
      </FavoritesStack.Screen>
      <FavoritesStack.Screen
        name="AddFavoriteScreen"
        options={{
          title: 'Add Favorite',
          headerShown: true,
          headerBackTitle: 'Back',
        }}>
        {() => (
          <AddFavoriteScreen title={'Add Favorites'} name={'AddFavorite'} />
        )}
      </FavoritesStack.Screen>
    </FavoritesStack.Navigator>
  );
};

export const WalletScreenStack = props => {
  const WalletStack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <WalletStack.Navigator
      screenOptions={{
        ...headerConfig,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
      }}>
      <WalletStack.Screen
        name="WalletScreen"
        options={{
          title: 'Wallet', //Set Header Title
        }}>
        {() => <WalletScreen title={'My Trips'} name={'WalletScreen'} />}
      </WalletStack.Screen>
    </WalletStack.Navigator>
  );
};

export const HelpScreenStack = props => {
  const HelpStack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <HelpStack.Navigator
      screenOptions={{
        ...headerConfig,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
      }}>
      <HelpStack.Screen
        name="HelpScreen"
        options={{
          title: 'Wallet', //Set Header Title
        }}>
        {() => <HelpScreen title={'Help'} name={'HelpScreen'} />}
      </HelpStack.Screen>
    </HelpStack.Navigator>
  );
};

export const SettingsScreenStack = props => {
  const SettingsStack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <SettingsStack.Navigator
      screenOptions={{
        ...headerConfig,
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
      }}>
      <SettingsStack.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings', //Set Header Title
        }}>
        {() => <SettingsScreen title={'Help'} name={'SettingsScreen'} />}
      </SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
};
