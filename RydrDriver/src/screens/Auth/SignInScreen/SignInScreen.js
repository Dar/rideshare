import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import SocialSignInButtons from '../../../components/UI/SocialSignInButtons';
import {colors} from '../../../shared/common/styles';
import {EMAIL_REGEX} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../../../store/app/hooks';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.signIn(data.email, data.password);
      const sessionStart = new Date().getTime();
      const sessionDuration = 3600 * 1000;
      const sessionExpiration = sessionStart + sessionDuration;

      // Save session information in AsyncStorage
      await AsyncStorage.setItem('sessionStart', sessionStart.toString());
      await AsyncStorage.setItem(
        'sessionExpiration',
        sessionExpiration.toString(),
      );
      return response;
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[screen_styles.root, {height: height}]}>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
          fgColor={colors.themeColor}
          style={{
            height: 250,
          }}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          bgColor={colors.themeColor}
          fgColor={colors.darkBlue}
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
          bgColor={colors.themeColor}
          fgColor={colors.darkBlue}
        />
      </View>
    </ScrollView>
  );
};

const screen_styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: colors.themeColor,
  },
});

export default SignInScreen;
