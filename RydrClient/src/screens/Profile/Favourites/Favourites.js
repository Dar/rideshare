import React, {useCallback, useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import screen_styles from './styles';

const Favorites = props => {
  return (
    <View style={screen_styles.container}>
      <Text>Favorites</Text>
    </View>
  );
};

export default Favorites;
