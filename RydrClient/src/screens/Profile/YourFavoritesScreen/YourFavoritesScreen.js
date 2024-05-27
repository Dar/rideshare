import React from 'react';
import {View, Pressable, Text, StyleSheet, StatusBar} from 'react-native';
import SwipeList from '../../../components/SwipeList/SwipeList';
import {colors} from '../../../shared/common/styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const YourFavorites = props => {
  const navigation = useNavigation();
  return (
    <View style={screen_styles.container}>
      <SwipeList />
      <Pressable
        style={screen_styles.button}
        onPress={() => navigation.navigate('AddFavoriteScreen')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Fontisto name="favorite" size={24} color={colors.softwhite} />
          <Text style={screen_styles.buttontext}>Add Favorite</Text>
        </View>

        <Entypo name="chevron-right" size={24} color={colors.softwhite} />
      </Pressable>
    </View>
  );
};

const screen_styles = StyleSheet.create({
  container: {
    backgroundColor: colors.softwhite,
  },
  button: {
    paddingVertical: StatusBar.currentHeight + 20 || 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.darkBlue,
    borderBottomWidth: 1,
  },
  buttontext: {
    color: colors.softwhite,
    fontSize: 18,
    marginLeft: 10,
  },
});

export default YourFavorites;
