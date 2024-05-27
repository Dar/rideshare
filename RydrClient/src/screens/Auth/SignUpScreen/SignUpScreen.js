import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/core';
import {Auth} from 'aws-amplify';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import SocialSignInButtons from '../../../components/UI/SocialSignInButtons';
import {colors} from '../../../shared/common/styles/';
import {EMAIL_REGEX} from '../../../constants';

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {phone_number, password, email, given_name, family_name} = data;
    try {
      await Auth.signUp({
        username: email,
        given_name,
        family_name,
        password,
        attributes: {
          given_name,
          family_name,
          email,
          phone_number: `+${phone_number}`,
          preferred_username: email,
        },
      });
      navigation.navigate('ConfirmEmail', {email});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={screen_styles.root}>
        <Text style={screen_styles.title}>Create an account</Text>
        <CustomInput
          name="given_name"
          control={control}
          placeholder="First Name"
          rules={{
            required: 'First Name is required',
            minLength: {
              value: 3,
              message: 'First Name should be at least 3 characters long',
            },
            maxLength: {
              value: 32,
              message: 'First Name should be max 32 characters long',
            },
          }}
        />
        <CustomInput
          name="family_name"
          control={control}
          placeholder="Last Name"
          rules={{
            required: 'Last Name is required',
            minLength: {
              value: 3,
              message: 'Last sName should be at least 3 characters long',
            },
            maxLength: {
              value: 32,
              message: 'Last Name should be max 32 characters long',
            },
          }}
        />

        <CustomInput
          name="phone_number"
          control={control}
          placeholder="Phone Number"
          rules={{
            required: 'Phone Number is required',
            minLength: {
              value: 10,
              message: 'Phone Number should be at least 10 digits long',
            },
            maxLength: {
              value: 11,
              message: 'Phone Number should be max 11 digits long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
          fgColor={colors.white}
        />

        <Text style={screen_styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={screen_styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={screen_styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const screen_styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.softwhite,
    height: '100%',
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
});

export default SignUpScreen;
