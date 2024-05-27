import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useAppSelector} from '../../store/app/hooks';
import component_styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../shared/common/styles';

const RouteDetails = props => {
  const {duration, distance} = useAppSelector(state => state.mapState);

  const [timeToArrival, setTimeToArrival] = useState(new Date());

  return (
    <View style={component_styles.rideSummary}>
      <View style={component_styles.rideSummaryTextContainer}>
        <View style={component_styles.rideSummaryMetrics}>
          <View style={component_styles.icon}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={colors.darkBlue}
              style={{marginRight: 5}}
              size={32}
            />
            <Text style={component_styles.rideSummaryTextBody}>
              {timeToArrival.toLocaleTimeString()}
            </Text>
          </View>
          <View style={component_styles.icon}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              color={colors.darkBlue}
              style={{marginRight: 5}}
              size={32}
            />
            <Text style={component_styles.rideSummaryTextBody}>
              {distance.toFixed()} km
            </Text>
          </View>
          <View style={component_styles.icon}>
            <Ionicons
              name="hourglass-outline"
              color={colors.darkBlue}
              style={{marginRight: 5}}
              size={32}
            />
            <Text style={component_styles.rideSummaryTextBody}>
              {duration.toFixed()} min
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RouteDetails;
