import React from 'react';
import {View, Text, Pressable} from 'react-native';
import component_styles from './styles';
import {colors} from '../../shared/common/styles/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const RideTypeRow = props => {
  const {type, onPress, isSelected} = props;

  const getCarTypeImage = () => {
    if (type.type === 'Standard') {
      return (
        <Fontisto
          name={'automobile'}
          size={32}
          color={isSelected ? colors.softwhite : colors.darkBlue}
        />
      );
    }
    if (type.type === 'Comfort') {
      return (
        <Fontisto
          name={'automobile'}
          size={32}
          color={isSelected ? colors.softwhite : colors.darkBlue}
        />
      );
    }
    return (
      <Fontisto
        name={'automobile'}
        size={32}
        color={isSelected ? colors.softwhite : colors.darkBlue}
      />
    );
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        component_styles.container,
        {
          backgroundColor: isSelected ? colors.darkBlue : colors.softwhite,
        },
      ]}>
      {/*  Image */}
      <View style={component_styles.block}>
        {getCarTypeImage()}
        <Text
          style={[
            component_styles.type,
            {color: isSelected ? colors.softwhite : colors.darkText},
          ]}>
          {type.type}
        </Text>
      </View>

      <View style={[component_styles.block, {flex: 2}]}>
        <Text
          style={[
            component_styles.type,
            {color: isSelected ? colors.softwhite : colors.darkText},
          ]}>
          16 min away (est)
        </Text>
      </View>
      <View style={component_styles.rightBock}>
        <FontAwesome name={'dollar'} size={14} color={'#42d742'} />
        <Text
          style={[
            component_styles.price,
            {color: isSelected ? colors.softwhite : colors.darkText},
          ]}>
          {type.price}
        </Text>
      </View>
    </Pressable>
  );
};

export default RideTypeRow;
