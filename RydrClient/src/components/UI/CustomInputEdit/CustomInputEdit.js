import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {colors} from '../../../shared/common/styles';
const CustomInputEdit = ({
  children,
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
              component_styles.action,
              {borderColor: error ? colors.red : colors.darkBlue},
            ]}>
            {children}
            <View>
              <TextInput
                value={value}
                placeholderTextColor={colors.darkGray}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCorrect={autoCorrect}
                placeholder={placeholder}
                style={component_styles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
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
    backgroundColor: colors.darkText,
    width: '100%',
    borderColor: colors.darkBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    paddingVertical: 10,
    color: colors.darkText,
    backgroundColor: colors.softwhite,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    margin: 10,
  },
  text: {
    color: colors.darkText,
    marginVertical: 10,
  },
  link: {
    color: colors.blue,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    paddingBottom: 5,
    alignItems: 'center',
  },
});

export default CustomInputEdit;
