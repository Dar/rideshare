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
              {borderColor: error ? colors.red : colors.darkBlue},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCorrect={autoCorrect}
              placeholder={placeholder}
              placeholderTextColor={colors.darkText}
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
    backgroundColor: colors.themeColor,
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
  },
});

export default CustomInput;
