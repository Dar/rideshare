// AuthGuard.js
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Auth, Hub} from 'aws-amplify';
import {setAuth} from '../../store/features/driver/driver-slice';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';

const AuthGuard = ({children}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {authUser} = useAppSelector(state => state.driver);

  const checkUser = async () => {
    try {
      const authUserLogginedIn = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const {attributes} = authUserLogginedIn;
      dispatch(setAuth(attributes));
    } catch (e) {
      dispatch(setAuth(null));
      navigation.navigate('AuthStack');
    }
  };

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
      Hub.listen('auth', listener);
    };

    return () => Hub.remove('auth', listener);
  }, []);

  // Render the specified children (screen) if the user is authenticated
  return authUser ? children : null;
};

export default AuthGuard;
