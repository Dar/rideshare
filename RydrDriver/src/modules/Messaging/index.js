import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

const Messaging = ({handleBottomSheetClose}) => (
  <View>
    <Text>Messaging</Text>
    <Button onPress={handleBottomSheetClose} title={'Close'} />
  </View>
);

export default Messaging;
