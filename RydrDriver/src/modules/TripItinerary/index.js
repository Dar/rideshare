import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

const TripItinerary = ({handleBottomSheetClose}) => (
  <View>
    <Text>TripItinerary</Text>
    <Button onPress={handleBottomSheetClose} title={'Close'} />
  </View>
);

export default TripItinerary;
