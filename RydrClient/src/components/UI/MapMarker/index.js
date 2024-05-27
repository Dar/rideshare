import React from 'react';
import {Marker} from 'react-native-maps';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MapMarker = ({coordinate, pinColor, bgColor, title}) => (
  <Marker
    coordinate={coordinate}
    anchor={{x: 0.46, y: 1.02}}
    pinColor={pinColor}>
    <View style={markerStyles.marker}>
      <View style={[markerStyles.icon, {backgroundColor: bgColor}]}>
        <Ionicons name="location-outline" size={24} color={colors.white} />
      </View>
      <Text style={markerStyles.markerText}>{title}</Text>
    </View>
    <View style={markerStyles.pointerLine}></View>
  </Marker>
);

export default MapMarker;

const markerStyles = StyleSheet.create({
  marker: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: colors.softwhite,
    color: colors.lightblack,
    borderColor: colors.lightblack,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 50,
  },
  pointerLine: {
    backgroundColor: colors.darkBlue,
    width: 4,
    height: 50,
    position: 'absolute',
    top: 50,
    left: '45%',
  },
  icon: {
    padding: 5,
    height: '100%',
    justifyContent: 'center',
  },
  markerText: {
    padding: 5,
    borderRadius: 5,
    width: 125,
  },
});
