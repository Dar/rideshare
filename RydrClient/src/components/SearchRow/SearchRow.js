import React from 'react';
import {View, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import screen_styles from './styles';

const SearchRow = ({data}) => {
  const predefinedPlaces = () => {
    if (data.description === 'Home') {
      return <Entypo name={'home'} size={16} color={'#ffffff'} />;
    } else if (data.description === 'Work') {
      return <Entypo name={'briefcase'} size={16} color={'#ffffff'} />;
    } else {
      return <Entypo name={'location-pin'} size={16} color={'#ffffff'} />;
    }
  };
  return (
    <View style={screen_styles.autoCompleteListContainer}>
      <View style={screen_styles.row}>
        <View style={screen_styles.iconContainer}>{predefinedPlaces()}</View>
        <View>
          {data.structured_formatting.main_text ? (
            <Text style={(screen_styles.locationText, screen_styles.address)}>
              {data.structured_formatting.main_text}
            </Text>
          ) : null}

          <Text style={(screen_styles.locationText, screen_styles.location)}>
            {data.structured_formatting.secondary_text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SearchRow;
