import React, {useState, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import {colors} from '../../../shared/common/styles';
import WithBottomSheet from '../../../components/UI/WithBottomSheet';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../../../shared/common/imagePath';

const EditProfileScreen = props => {
  const navigation = useNavigation();
  const [image, setImage] = useState('../../../assets/images/image-pixel.png');
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const bottomSheetRef = useRef(null);
  const fall = new Animated.Value(1);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(index => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
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
      setImage(image.path);
      bottomSheetRef.current.snapTo(1);
    });
  };

  const renderInner = () => (
    <View style={screen_styles.panelPhoto}>
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
          <Text style={screen_styles.panelButtonTitle}>
            Choose From Library
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={screen_styles.panelButton}
          onPress={() => handleDismissModalPress()}>
          <Text style={screen_styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={screen_styles.container}>
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity onPress={() => handlePresentModalPress()}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                    backgroundColor: colors.lightblack,
                    borderRadius: 50,
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color={colors.softwhite}
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
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: colors.darkText,
              marginTop: 10,
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Dario Di Felice
          </Text>
        </View>

        <View style={screen_styles.action}>
          <FontAwesome name="user-o" color={colors.lightblack} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor={colors.darkBlue}
            autoCorrect={false}
            style={[
              screen_styles.textInput,
              {
                color: colors.darkText,
              },
            ]}
          />
        </View>
        <View style={screen_styles.action}>
          <FontAwesome name="user-o" color={colors.lightblack} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={colors.darkBlue}
            autoCorrect={false}
            style={[
              screen_styles.textInput,
              {
                color: colors.darkText,
              },
            ]}
          />
        </View>
        <View style={screen_styles.action}>
          <Feather name="phone" color={colors.lightblack} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={colors.darkBlue}
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              screen_styles.textInput,
              {
                color: colors.darkText,
              },
            ]}
          />
        </View>
        <View style={screen_styles.action}>
          <FontAwesome name="envelope-o" color={colors.lightblack} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.darkBlue}
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              screen_styles.textInput,
              {
                color: colors.darkText,
              },
            ]}
          />
        </View>
        <View style={screen_styles.action}>
          <FontAwesome name="globe" color={colors.lightblack} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor={colors.darkBlue}
            autoCorrect={false}
            style={[
              screen_styles.textInput,
              {
                color: colors.darkText,
              },
            ]}
          />
        </View>
        <View style={screen_styles.action}>
          <Icon name="map-marker-outline" color={colors.lightblack} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor={colors.darkBlue}
            autoCorrect={false}
            style={[
              screen_styles.textInput,
              {
                color: colors.darkText,
              },
            ]}
          />
        </View>
        <View style={screen_styles.footerButton}>
          <TouchableOpacity
            style={screen_styles.commandButton}
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}>
            <Text style={screen_styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={screen_styles.commandButton}
            onPress={() => {
              console.log('SAVE EDIT');
            }}>
            <Text style={screen_styles.panelButtonTitle}>Save</Text>
          </TouchableOpacity>
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
    backgroundColor: colors.softwhite,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.softwhite,
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.softwhite,
    shadowColor: colors.black,
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelPhoto: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.softwhite,
    marginBottom: 10,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    paddingBottom: 5,
    alignItems: 'center',
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: colors.darkText,
    paddingVertical: 10,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default EditProfileScreen;
