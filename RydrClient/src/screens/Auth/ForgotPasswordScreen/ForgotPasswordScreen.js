import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/core';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import {colors} from '../../../shared/common/styles/';
import {useAppSelector} from '../../../store/app/hooks';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const onSendPressed = async data => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate('NewPassword');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={screen_styles.root}>
        <Text style={screen_styles.title}>Reset your password</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <CustomButton
          text="Send"
          fgColor={colors.softwhite}
          onPress={handleSubmit(onSendPressed)}
        />

        <CustomButton
          text="Back to Sign in"
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    margin: 10,
  },
  text: {
    color: colors.grey,
    marginVertical: 10,
  },
  link: {
    color: colors.blue,
  },
});

export default ForgotPasswordScreen;
