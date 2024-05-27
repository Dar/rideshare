import React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Auth} from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../shared/common/styles/';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {clearOrderState} from '../store/features/order/order-slice';
import {clearMapState} from '../store/features/map/map-slice';
import {clearOrdersState} from '../store/features/order/orders-slice';
import {useAppDispatch} from '../store/app/hooks';
import {
  clearDriverState,
  signOutUser,
  updateActiveDriver,
} from '../store/features/driver/driver-slice';
import {purgeState} from '../shared/helper/persistPurge';

const CustomDrawer = props => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const closeMenuDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  async function signOut() {
    try {
      await Auth.signOut({global: true});
      purgeState();
    } catch (error) {
      console.log('error signing out: ', error);
      throw error;
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: colors.darkBlue,
          paddingTop: 20,
          top: -5,
        }}>
        {/* User Row */}
        <View style={drawer_styles.profileContainer}>
          <View style={drawer_styles.profileImageContainer}>
            <Image
              source={require('../assets/images/blankProfilePic.jpg')}
              style={drawer_styles.profileImage}
            />
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.themeColor,
              paddingBottom: 5,
            }}>
            <Text style={drawer_styles.profileNameText}>Dario Di Felice</Text>
          </View>
        </View>
        <Pressable
          style={{position: 'absolute', top: 10, right: 10}}
          onPress={() => {
            closeMenuDrawer();
          }}>
          <AntDesign
            name="closecircleo"
            color={colors.themeColor}
            styles={{
              marginLeft: 0,
              backgroundColor: colors.themeColor,
              zIndex: 1000,
            }}
            size={20}
          />
        </Pressable>

        <View style={drawer_styles.profileButtonContainer} elevation={5}>
          <Pressable
            onPress={() => {
              navigation.navigate('MyProfile');
            }}
            style={drawer_styles.profileButton}>
            <Text style={drawer_styles.profileText}>Go to Profile</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          labelStyle={{color: colors.darkText}}
          icon={({focused}) => (
            <AntDesign
              name="logout"
              color={focused ? colors.darkText : colors.darkBlue}
              styles={{marginLeft: 0}}
              size={24}
            />
          )}
          onPress={() => {
            dispatch(
              updateActiveDriver({
                isActive: false,
              }),
            );
            dispatch(clearDriverState());
            dispatch(clearOrderState());
            dispatch(clearMapState());
            dispatch(clearOrdersState());
            dispatch(signOutUser());
            navigation.dispatch(DrawerActions.toggleDrawer());
            signOut();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const drawer_styles = StyleSheet.create({
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  profileNameText: {
    color: colors.softwhite,
    fontSize: 24,
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    color: colors.darkBlue,
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 18,
  },
  profileButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  profileButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.themeColor,
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
});
