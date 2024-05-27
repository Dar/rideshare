import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import {colors} from '../../../shared/common/styles';

//import files from '../assets/filesBase64';

const ProfileScreen = () => {
  // const myCustomShare = async() => {
  //   const shareOptions = {
  //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //     url: files.appLogo,
  //     // urls: [files.image1, files.image2]
  //   }

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch(error) {
  //     console.log('Error => ', error);
  //   }
  // };

  return (
    <SafeAreaView style={screen_styles.container}>
      <View style={screen_styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title
              style={[
                screen_styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              Dario Di Felice
            </Title>
            <Caption style={screen_styles.caption}>@ddifelice</Caption>
          </View>
        </View>
      </View>

      <View style={screen_styles.userInfoSection}>
        <View style={screen_styles.row}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            color={colors.darkText}
            size={20}
          />
          <Text style={[screen_styles.text, {marginLeft: 20}]}>
            Niagara Falls, Ontario
          </Text>
        </View>
        <View style={screen_styles.row}>
          <MaterialCommunityIcons
            name="phone"
            color={colors.darkText}
            size={20}
          />
          <Text style={[screen_styles.text, {marginLeft: 20}]}>
            +1 647 241 7827
          </Text>
        </View>
        <View style={screen_styles.row}>
          <MaterialCommunityIcons
            name="email"
            color={colors.darkText}
            size={20}
          />
          <Text style={[screen_styles.text, {marginLeft: 20}]}>
            dar@email.com
          </Text>
        </View>
      </View>

      <View style={screen_styles.infoBoxWrapper}>
        <View
          style={[
            screen_styles.infoBox,
            {
              borderRightColor: colors.darkBlue,
              borderRightWidth: 1,
            },
          ]}>
          <FontAwesome name={'dollar'} size={14} color={colors.green} />
          <Title style={screen_styles.text}>140.50</Title>
          <Caption style={screen_styles.text}>Wallet</Caption>
        </View>
        <View style={screen_styles.infoBox}>
          <Title style={screen_styles.text}>12</Title>
          <Caption style={screen_styles.text}>Orders</Caption>
        </View>
      </View>

      <View style={screen_styles.menuWrapper}>
        <TouchableRipple
          onPress={() => {
            console.log('Heart');
          }}>
          <View style={screen_styles.menuItem}>
            <MaterialCommunityIcons
              name="heart-outline"
              color={colors.darkText}
              size={25}
            />
            <Text style={screen_styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={screen_styles.menuItem}>
            <MaterialCommunityIcons
              name="credit-card"
              color={colors.darkText}
              size={25}
            />
            <Text style={screen_styles.menuItemText}>Wallet</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => console.warn('share!')}>
          <View style={screen_styles.menuItem}>
            <MaterialCommunityIcons
              name="share-outline"
              color={colors.darkText}
              size={25}
            />
            <Text style={screen_styles.menuItemText}>Share</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={screen_styles.menuItem}>
            <MaterialCommunityIcons
              name="account-check-outline"
              color={colors.darkText}
              size={25}
            />
            <Text style={screen_styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={screen_styles.menuItem}>
            <Ionicons
              name="settings-outline"
              color={colors.darkText}
              size={25}
            />
            <Text style={screen_styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const screen_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: colors.darkText,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 1,
    borderTopColor: colors.darkBlue,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: colors.darkText,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  text: {
    color: colors.darkText,
  },
});
