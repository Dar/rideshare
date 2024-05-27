import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../../../shared/common/imagePath';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import SocialSignInButtons from '../../../components/UI/SocialSignInButtons';
import {colors} from '../../../shared/common/styles';
import {EMAIL_REGEX} from '../../../constants';
import RippleButton from '../../../components/UI/RippleButton';
import {useAppSelector} from '../../../store/app/hooks';
import {useFocusEffect} from '@react-navigation/native';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {order} = useAppSelector(state => state.orderState);
  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      return () => {
        setIsVisible(false);
      };
    }, []),
  );
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
    <>
      {isVisible && (
        <>
          <ScrollView
            style={screen_styles.scrollWrapper}
            showsVerticalScrollIndicator={false}>
            <View style={screen_styles.root}>
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

              <RippleButton
                style={screen_styles.primaryButton}
                buttonStyle={screen_styles.goSearchButtonText}
                onPress={handleSubmit(onSignInPressed)}
                title={loading ? 'Loading...' : 'Sign In'}
              />

              <CustomButton
                text="Forgot password?"
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
                bgColor={colors.softwhite}
                fgColor={colors.darkBlue}
              />

              <SocialSignInButtons />

              <CustomButton
                text="Don't have an account? Create one"
                onPress={onSignUpPress}
                type="TERTIARY"
                bgColor={colors.softwhite}
                fgColor={colors.darkBlue}
              />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const screen_styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
  },
  scrollWrapper: {
    height: '100%',
    backgroundColor: colors.softwhite,
  },
  primaryButton: {
    borderRadius: 5,
    marginTop: 5,
  },
});

export default SignInScreen;
