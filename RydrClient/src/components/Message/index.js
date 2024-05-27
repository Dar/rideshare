import React from 'react';
import {View, Text} from 'react-native';
import component_styles from './styles';

const Message = props => {
  return (
    <View style={component_styles.container}>
      <Text style={component_styles.title}>Important Message</Text>
      <Text style={component_styles.text}>Don't fuck around</Text>
      <Text style={component_styles.learnMore}>Learn More</Text>
    </View>
  );
};

export default Message;
