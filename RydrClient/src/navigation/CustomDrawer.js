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
import {
  useNavigation,
  DrawerActions,
  useDrawerStatus,
} from '@react-navigation/native';
import {useAppDispatch} from '../store/app/hooks';
import {setOrder} from '../store/features/order/order-slice';
import {clearDriversState} from '../store/features/drivers/drivers-slice';
import {clearDriverState} from '../store/features/drivers/driver-slice';
import {clearMapState} from '../store/features/map/map-slice';
import {purgeState} from '../shared/helper/persistPurge';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const closeMenuDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  async function signOut() {
    try {
      await Auth.signOut({global: true});
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <DrawerContentScrollView
      style={{
        padding: 0,
      }}
      {...props}>
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
              borderBottomColor: colors.softwhite,
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
            color={colors.softwhite}
            styles={{
              marginLeft: 0,
              backgroundColor: colors.darkBlue,
              zIndex: 1000,
            }}
            size={20}
          />
        </Pressable>

        {/* Profile Button Row */}
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
              color={focused ? colors.yellow : colors.darkBlue}
              styles={{marginLeft: 0}}
              size={24}
            />
          )}
          onPress={() => {
            purgeState();
            dispatch(clearDriversState());
            navigation.dispatch(DrawerActions.closeDrawer());
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
    backgroundColor: colors.softwhite,
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
});
