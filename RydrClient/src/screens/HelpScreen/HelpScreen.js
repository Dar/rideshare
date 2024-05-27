import React, {useCallback, useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import screen_styles from './styles';

const HelpScreen = props => {
  return (
    <View style={screen_styles.container}>
      <Text>{props.name}</Text>
    </View>
  );
};

export default HelpScreen;
