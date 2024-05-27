import React from 'react';
import {View, Text} from 'react-native';
import imagePath from '../../shared/common/imagePath';
import component_styles from './styles';

const VehicleList = props => {
  return (
    <View style={component_styles.rideTypeConatainer}>
      <View style={component_styles.rideType}>
        <Text style={component_styles.rideTypeText}>5 min</Text>
        <Image
          style={component_styles.rideTypeImage}
          source={imagePath.carTypeComfort}
        />
      </View>
      <View style={component_styles.rideType}>
        <Text style={component_styles.rideTypeText}>16 min</Text>
        <Image
          style={component_styles.rideTypeImage}
          source={imagePath.carTypeSuv}
        />
      </View>
    </View>
  );
};

export default VehicleList;
