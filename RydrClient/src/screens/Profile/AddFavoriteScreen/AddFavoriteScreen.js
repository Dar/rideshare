import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {GOOGLE_API_KEY} from '@env';
import {colors, transparentColor} from '../../../shared/common/styles/';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  LATITUDE_HOME,
  LONGITUDE_HOME,
  LATITUDE_WORK,
  LONGITUDE_WORK,
} from '../../../shared/position';
import SearchRow from '../../../components/SearchRow/SearchRow';
import CustomInput from '../../../components/UI/CustomInput/CustomInput';
import CustomButton from '../../../components/UI/CustomButton';
import RadioButton from '../../../components/UI/RadioButton';
const homePlace = {
  description: 'Home',
  geometry: {location: {lat: LATITUDE_HOME, lng: LONGITUDE_HOME}},
};

const workPlace = {
  description: 'Work',
  geometry: {location: {lat: LATITUDE_WORK, lng: LONGITUDE_WORK}},
};

const {width, height} = Dimensions.get('window');

const AddFavoriteScreen = () => {
  const [faveAddress, setFaveAddress] = useState(null);
  const ref = useRef();
  const [isFavorite, setIsFavorite] = useState([
    {id: 1, value: 'Home', name: 'Home', selected: true},
    {id: 2, value: 'Work', name: 'Work', selected: false},
    {id: 3, value: 'Other', name: 'Other', selected: false},
  ]);

  const {control, handleSubmit, watch} = useForm();

  const onRadioBtnClick = item => {
    let updatedState = isFavorite.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsFavorite(updatedState);
  };

  useEffect(() => {
    ref.current?.setAddressText('');
  }, [faveAddress]);
  return (
    <View style={screen_styles.container}>
      <View style={screen_styles.wrapper}>
        <View style={screen_styles.searchFieldsContainer}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={'Search Address'}
            onPress={(data, details = null) => {
              setFaveAddress({data, details});
            }}
            debounce={100}
            enablePoweredByContainer={false}
            suppressDefaultStyles
            currentLocation={false}
            currentLocationLabel="Current location"
            textInputProps={{
              placeholderTextColor: transparentColor.darkText,
              returnKeyType: 'search',
            }}
            styles={{
              textInputContainer: screen_styles.textInputNoBorder,
              textInput: screen_styles.textInput,
              container: screen_styles.autocompleteContainer,
              listView: screen_styles.listView,
              separator: screen_styles.separator,
            }}
            fetchDetails
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
              components: 'country:ca',
            }}
            renderLeftButton={() => (
              <View style={screen_styles.searcIcon}>
                <AntDesign name="search1" size={20} color={colors.darkBlue} />
              </View>
            )}
            renderDescription={data => data.description || data.vicinity}
            renderRow={data => <SearchRow data={data} />}
          />
        </View>
        {faveAddress ? (
          <View style={screen_styles.bottomContainer}>
            <View style={screen_styles.action}>
              <View style={screen_styles.address_container}>
                <Entypo name="location" size={24} color={colors.darkBlue} />
                <Text style={screen_styles.address_text}>
                  {`${faveAddress.details.address_components[0].short_name} ${faveAddress.details.address_components[1].short_name} ${faveAddress.details.address_components[2].short_name}`}
                </Text>
              </View>
              <View style={screen_styles.radios}>
                {isFavorite.map(item => (
                  <RadioButton
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    direction="column"
                    key={item.id}>
                    {item.name}
                  </RadioButton>
                ))}
              </View>
              <View style={screen_styles.textInputContaier}>
                {isFavorite[2].selected === true ? (
                  <View style={screen_styles.nameContainer}>
                    <View style={screen_styles.nameIcon}>
                      <MaterialCommunityIcons
                        name={'star-circle'}
                        size={24}
                        color={colors.darkBlue}
                      />
                    </View>
                    <CustomInput
                      name="favoritename"
                      control={control}
                      buttonStyle={{borderBottomWidth: 1}}
                      style={[screen_styles.otherInput]}
                      placeholderTextColor={transparentColor.darkText}
                      onChangeText={text => setOtherPayment(text)}
                      placeholder='Add name. i.e "Gym"'
                      rules={{
                        required: 'Name is required',
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}
      </View>

      <View
        style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
        <CustomButton
          onPress={() => {}}
          bgColor={colors.darkBlue}
          fgColor={colors.softwhite}
          text={'Save'}
        />
      </View>
    </View>
  );
};
const screen_styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    backgroundColor: colors.softwhite,
    width: '100%',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  wrapper: {
    padding: 0,
    marginTop: 0,
    position: 'relative',
    justifyContent: 'center',
    zIndex: 100,
    flex: 0,
    width: '100%',
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.darkBlue,
    // borderTopWidth: 1,
    // borderTopColor: colors.darkBlue,
  },

  otherInput: {
    width: '90%',
    left: 0,
  },

  nameIcon: {
    zIndex: 100,
    backgroundColor: colors.softwhite,
  },

  bottomContainer: {
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.lightblack,
    backgroundColor: colors.softwhite,
    width: '100%',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    marginVertical: 20,
  },
  searcIcon: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
  },
  address_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.softwhite,
    paddingHorizontal: 20,
    width: '100%',
    height: 40,
  },
  address_text: {
    marginRight: 20,
    flex: 1,
    textAlign: 'center',
  },
  searchFieldsContainer: {
    marginTop: 20,
    paddingVertical: 10,
    position: 'relative',
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
    borderTopWidth: 1,
    borderTopColor: colors.darkBlue,
    backgroundColor: colors.softwhite,
  },

  textInputContaier: {
    width: '100%',
  },

  textInput: {
    position: 'relative',
    paddingVertical: 10,
    zIndex: 200,
    backgroundColor: colors.softwhite,
    color: colors.darkText,
    bottom: 0,
    left: 30,
    width: '85%',
  },

  listView: {
    position: 'absolute',
    backgroundColor: colors.softwhite,
    top: 50,
    color: colors.darkText,
  },

  placeholderText: {
    color: colors.darkText,
  },

  autocompleteContainer: {
    position: 'relative',
    top: 0,
    left: 10,
    right: 10,
  },

  bottomSheetContainer: {
    paddingLeft: 30,
    paddingRight: 20,
    marginTop: 20,
  },

  primaryExpandableToggleText: {
    color: colors.secondaryBlack,
    fontSize: 20,
    fontWeight: 'bold',
  },
  noResults: {
    backgroundColor: colors.red,
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: width - 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textInputNoBorder: {
    border: 0,
    color: colors.darkText,
    backgroundColor: colors.softwhite,
  },

  radios: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default AddFavoriteScreen;
