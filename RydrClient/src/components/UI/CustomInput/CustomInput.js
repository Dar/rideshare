import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {colors} from '../../../shared/common/styles/';
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  autoCorrect = false,
  secureTextEntry,
  buttonStyle = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              component_styles.container,
              buttonStyle,
              {borderColor: error ? colors.red : colors.darkBlue},
            ]}>
            <TextInput
              placeholderTextColor={colors.darkGray}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCorrect={autoCorrect}
              placeholder={placeholder}
              style={component_styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: colors.red, alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const component_styles = StyleSheet.create({
  container: {
    backgroundColor: colors.softwhite,
    color: colors.darkText,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    paddingVertical: 10,
    color: colors.darkText,
    backgroundColor: colors.softwhite,
  },
});

export default CustomInput;
