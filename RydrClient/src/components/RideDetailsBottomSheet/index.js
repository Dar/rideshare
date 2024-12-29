import React, { useMemo, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../shared/common/styles';
import imagePath from '../../shared/common/imagePath';
import rideDetailBottomSheet from './styles';

const RideDetailsBottomSheet = ({ car, order, tripDistance, isBottomSheetVisible }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const messages = useMemo(() => {
    if (order?.status === 'ARRIVED_AT_DESTINATION') {
      return 'You have arrived at your destination.';
    }
    switch (order?.status) {
      case 'ARRIVED_FOR_PICKUP':
        return 'Your driver has arrived at the pickup location.';
      case 'STARTING_TRIP':
        return 'Your trip is underway. Sit back and enjoy the ride!';
      default:
        return 'Driver is on the way to your location.';
    }
  }, [order?.status]);

  const tripTime = useMemo(() => {
    if (order?.pickupTime && order?.dropoffTime) {
      const pickup = new Date(order.pickupTime).getTime();
      const dropoff = new Date(order.dropoffTime).getTime();
      const totalMinutes = Math.ceil((dropoff - pickup) / 60000); // Convert to minutes
      return `${totalMinutes} min`;
    }
    return 'Calculating...';
  }, [order?.pickupTime, order?.dropoffTime]);

  const fare = useMemo(() => {
    if (order?.fare) {
      return `$${order.fare.toFixed(2)}`;
    }
    return 'Calculating...';
  }, [order?.fare]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isBottomSheetVisible ? 1 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => bottomSheetRef.current?.close()}
    >
      <View style={rideDetailBottomSheet.bottomSheetContainer}>
        {/* Driver Profile */}
        <View style={rideDetailBottomSheet.driverProfile}>
          <Image source={imagePath.profile} style={rideDetailBottomSheet.profileImage} />
          <View style={rideDetailBottomSheet.driverInfo}>
            <Text style={rideDetailBottomSheet.driverName}>
              {car ? `${car.given_name} ${car.family_name}` : 'Driver Name'}
            </Text>
            <Text style={rideDetailBottomSheet.carDetails}>Honda Civic BNXM-571</Text>
          </View>
        </View>

        {/* Fare and Time for Completed Trip */}
        {order?.status === 'ARRIVED_AT_DESTINATION' && (
          <View style={rideDetailBottomSheet.tripSummary}>
            <Text style={rideDetailBottomSheet.summaryTitle}>Trip Summary</Text>
            <Text style={rideDetailBottomSheet.summaryDetail}>Time: {tripTime}</Text>
            <Text style={rideDetailBottomSheet.summaryDetail}>Fare: {fare}</Text>
          </View>
        )}

        {/* Status and ETA */}
        {order?.status !== 'ARRIVED_AT_DESTINATION' && (
          <View style={rideDetailBottomSheet.statusSection}>
            <Text style={rideDetailBottomSheet.timeEstimate}>
              ETA: {tripDistance ? `${Math.ceil((tripDistance / 40) * 60)} min` : 'Calculating...'}
            </Text>
            <Text style={rideDetailBottomSheet.statusMessage}>{messages}</Text>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default RideDetailsBottomSheet;
