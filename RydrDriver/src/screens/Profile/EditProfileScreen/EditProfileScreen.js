import React, {useEffect, useState, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import {colors} from '../../../shared/common/styles';
import WithBottomSheet from '../../../components/UI/WithBottomSheet';
import CustomInput from '../../../components/UI/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import {EMAIL_REGEX} from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {Auth} from 'aws-amplify';

const EditProfileScreen = props => {
  const {control, handleSubmit, setValue} = useForm();

  const [image, setImage] = useState(null);
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const bottomSheetRef = useRef(null);
  const fall = new Animated.Value(1);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(index => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const loadUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userAttributes = await Auth.userAttributes(user);

      userAttributes.forEach(attribute => {
        const {Name, Value} = attribute;
        setValue(Name, Value);
      });
    } catch (error) {
      console.error('Error loading user data', error);
    }
  };

  useEffect(() => {
    // Load user data when the component mounts
    loadUserData();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bottomSheetRef.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bottomSheetRef.current.snapTo(1);
    });
  };

  const editProfile = async data => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, data);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const renderInner = () => (
    <View style={screen_styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={screen_styles.panelTitle}>Upload Photo</Text>
        <Text style={screen_styles.panelSubtitle}>
          Choose Your Profile Picture
        </Text>
      </View>
      <TouchableOpacity
        style={screen_styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={screen_styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={screen_styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={screen_styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={screen_styles.panelButton}
        onPress={() => handleDismissModalPress()}>
        <Text style={screen_styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={screen_styles.container}>
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handlePresentModalPress()}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {image ? (
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Entypo name={'camera'} size={42} color={colors.darkBlue} />
                  <Text>Edit image</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={screen_styles.root}>
          <Text style={screen_styles.title}>Edit Profile</Text>
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
          {/* <CustomInput
            name="password"
            control={control}
            placeholder="New Password"
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
            placeholder="Repeat New Password"
            secureTextEntry
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
          /> */}

          <CustomButton
            text="Save"
            onPress={handleSubmit(editProfile)}
            fgColor={colors.white}
          />
        </View>
      </Animated.View>
      <WithBottomSheet
        handleDismissModalPress={handleDismissModalPress}
        snapPoints={snapPoints}
        ref={bottomSheetRef}>
        {renderInner()}
      </WithBottomSheet>
    </View>
  );
};

const screen_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
  commandButton: {
    borderRadius: 10,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  panel: {
    backgroundColor: colors.themeColor,
    flex: 1,
    alignItems: 'center',
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
    color: colors.darkText,
  },
  panelSubtitle: {
    fontSize: 14,
    color: colors.darkText,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.softwhite,
  },

  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.themeColor,
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

export default EditProfileScreen;
