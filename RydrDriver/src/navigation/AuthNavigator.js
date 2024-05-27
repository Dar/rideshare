import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import {colors} from '../shared/common/styles';

const AuthStack = createStackNavigator();

export const AuthStackScreen = ({navigation}) => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerTitle: 'Sign in to Niagara Taxi',
        headerStyle: {
          backgroundColor: colors.darkBlue,
          shadowColor: colors.darkBlue, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.softwhite,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
        transitionSpec: {
          open: {animation: 'timing', config: {duration: 0}},
          close: {animation: 'timing', config: {duration: 0}},
        },
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
