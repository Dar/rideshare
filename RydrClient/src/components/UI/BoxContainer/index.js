import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../shared/common/styles/';
const BoxContainer = props => {
  return (
    <View style={{...component_styles.boxContainer, ...props.style}}>
      {props.children}
    </View>
  );
};

const component_styles = StyleSheet.create({
  boxContainer: {
    shadowColor: colors.lightblack,
    display: 'flex',
    backgroundColor: colors.darkBlue,
    width: '100%',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
  },
});

export default BoxContainer;
