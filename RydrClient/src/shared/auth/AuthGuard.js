// AuthGuard.js
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Auth, Hub} from 'aws-amplify';
import {createStackNavigator} from '@react-navigation/stack';

import {setProfile} from '../../store/features/riders/rider-slice';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {AuthStackScreen} from '../../navigation/AuthNavigator';

const Stack = createStackNavigator();

const AuthGuard = ({children}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {profile} = useAppSelector(state => state.rider);

  // const checkUser = async () => {
  //   try {
  //     const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
  //     const {attributes} = authUser;
  //     // dispatch(setProfile(attributes));
  //   } catch (e) {
  //     dispatch(setProfile(null));
  //   }
  // };

  // // useEffect(() => {
  //   checkUser();
  // }, []);

  // useEffect(() => {
  //   const listener = data => {
  //     if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
  //       checkUser();
  //     }
  //   };
  //   Hub.listen('auth', listener);
  //   return () => Hub.remove('auth', listener);
  // }, []);

  if (profile) {
    return children;
  } else {
    return (
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,

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
        <Stack.Screen name="AuthStack" component={AuthStackScreen} />
      </Stack.Navigator>
    );
  }
};

export default AuthGuard;
