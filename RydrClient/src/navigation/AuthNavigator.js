import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import {colors} from '../shared/common/styles';

export const AuthStackScreen = props => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitle: 'Sign in to Niagara Taxi',
        headerStyle: {
          backgroundColor: colors.darkBlue,
          shadowColor: colors.darkBlue, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.softwhite,
      }}>
      <AuthStack.Screen
        name="SignIn"
        options={{
          title: 'Sign In',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
        component={SignInScreen}
      />
      <AuthStack.Screen
        name="SignUp"
        options={{
          title: 'Sign Up',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
        component={SignUpScreen}
      />
      <AuthStack.Screen
        name="ConfirmEmail"
        options={{
          title: 'Confirm Email',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
        component={ConfirmEmailScreen}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        options={{
          title: 'Forgot Password',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};
