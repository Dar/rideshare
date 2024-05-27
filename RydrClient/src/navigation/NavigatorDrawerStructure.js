import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../shared/common/styles';
import {DrawerActions} from '@react-navigation/native';

const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{flexDirection: 'row', marginLeft: 10}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons
          name="ios-menu"
          size={25}
          color={colors.softwhite}
          backgroundColor={colors.darkBlue}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationDrawerStructure;
