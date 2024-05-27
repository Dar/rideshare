/**
 * Niagarrideshare
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, createRef} from 'react';
import {Provider} from 'react-redux';
import {StatusBar, Text, StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import RootNavigator from './src/navigation/Root';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {colors} from './src/shared/common/styles/';
import {locationPermission} from './src/shared/helper/helperFunction';
import {store} from './src/store/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {GOOGLE_API_KEY} from './src/constants';
import Geocoder from 'react-native-geocoding';
Amplify.configure(awsconfig);
let persistor = persistStore(store);
Geocoder.init(GOOGLE_API_KEY);

const App = () => {
  const isReadyRef = createRef();

  useEffect(() => {
    let isLoaded = false;
    if (Platform.OS === 'android') {
      isLoaded = true;
      locationPermission();
    } else {
      // IOS
      isLoaded = true;
      Geolocation.requestAuthorization('whenInUse');
    }

    return () => {
      isLoaded = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer
            onReady={() => {
              isReadyRef.current = true;
            }}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.softwhite,
  },
});

export default App;
