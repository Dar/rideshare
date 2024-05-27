import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../shared/common/styles/';

const BoxItem = props => {
  return (
    <View style={{...component_styles.boxItem, ...props.style}}>
      {props.children}
    </View>
  );
};

export default BoxItem;

const component_styles = StyleSheet.create({
  boxItem: {
    shadowColor: colors.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  boxContainerChild: {},
});
