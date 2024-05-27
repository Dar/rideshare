import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigateRef} from '../navigationRef';
import {Auth} from 'aws-amplify';
import {signOutUser} from '../../store/features/driver/driver-slice';
signOutUser;
const SessionHandler = ({navigation}) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Check authentication status on app start
    checkAuthStatus();

    // Add event listener for app state changes
    AppState.addEventListener('change', handleAppStateChange);

    // Cleanup on component unmount
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    // Check authentication status when app state changes
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      checkAuthStatus();
    }

    setAppState(nextAppState);
  };

  async function signOut() {
    try {
      await Auth.signOut({global: true});
      dispatch(signOutUser());
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const checkAuthStatus = async () => {
    try {
      // Retrieve session expiration timestamp from AsyncStorage
      const expirationTimestamp = await AsyncStorage.getItem(
        'sessionExpiration',
      );

      if (expirationTimestamp) {
        const currentTime = new Date().getTime();
        const expirationTime = parseInt(expirationTimestamp, 10);

        // Check if the session has expired
        if (currentTime > expirationTime) {
          Auth.signOut();
        }
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  return <></>; // You can customize this component based on your UI requirements
};

export default SessionHandler;
