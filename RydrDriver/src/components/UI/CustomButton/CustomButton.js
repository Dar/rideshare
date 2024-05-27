import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {colors} from '../../../shared/common/styles/';

const CustomButton = ({
  width,
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        component_styles.container,
        component_styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : null,
        width ? {width: width} : null,
      ]}>
      <Text
        style={[
          component_styles.text,
          component_styles[`text_${type}`],
          fgColor ? {color: fgColor} : null,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const component_styles = StyleSheet.create({
  container: {
    padding: 15,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: colors.darkBlue,
    width: '100%',
  },

  container_SECONDARY: {
    borderColor: colors.darkBlue,
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: colors.darkText,
    fontSize: 18,
  },

  text_SECONDARY: {
    color: colors.darkBlue,
  },

  text_TERTIARY: {
    color: colors.darkText,
  },
});

export default CustomButton;
