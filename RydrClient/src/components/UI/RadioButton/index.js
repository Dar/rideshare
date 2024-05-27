import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../shared/common/styles';

const RadioButton = ({
  marginLeft = 0,
  direction = 'row',
  onPress,
  selected,
  children,
}) => {
  return (
    <View
      style={[radio_styles.radioButtonContainer, {flexDirection: direction}]}>
      <TouchableOpacity onPress={onPress} style={radio_styles.radioButton}>
        {selected ? <View style={radio_styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={[radio_styles.radioButtonText, {marginLeft: marginLeft}]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const radio_styles = StyleSheet.create({
  radioButtonContainer: {
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    height: 50,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: colors.softwhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: colors.darkBlue,
  },
  radioButtonText: {
    fontSize: 14,
  },
  text: {
    fontSize: 20,
    marginVertical: 15,
    textAlign: 'center',
  },
});
