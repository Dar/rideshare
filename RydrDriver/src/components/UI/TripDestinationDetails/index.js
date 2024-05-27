import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../shared/common/styles';
import BoxContainer from '../BoxContainer';
import BoxItem from '../BoxItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAppSelector} from '../../../store/app/hooks';

const TripDestinationDetails = props => {
  const {origin, destination, distance, duration} = useAppSelector(
    state => state.mapState,
  );
  return (
    <BoxContainer
      style={tripDestinationStyles.tripDestinationDetails}
      col={'full'}>
      <View style={tripDestinationStyles.boxContainerTop}>
        <View>
          {/* Circle near Origin input */}
          <View style={tripDestinationStyles.circle}>
            <MaterialIcons
              name={'directions-car'}
              size={24}
              color={colors.green}
            />
            <Text style={tripDestinationStyles.tripDestinationDetailsText}>
              3
              <Text style={tripDestinationStyles.tripDestinationSecondaryText}>
                {' '}
                km
              </Text>
            </Text>
          </View>
          {/* Line between dots */}
          <View style={tripDestinationStyles.line} />
          {/* Square near Destination input */}
          <View style={tripDestinationStyles.square}>
            <Entypo
              style={{marginBottom: 2.5}}
              name={'location'}
              size={24}
              color={colors.red}
            />
            <Text style={tripDestinationStyles.tripDestinationDetailsText}>
              {distance.toFixed()}
              <Text style={tripDestinationStyles.tripDestinationSecondaryText}>
                {' '}
                km
              </Text>
            </Text>
          </View>
        </View>

        <BoxItem style={tripDestinationStyles.tripDestinationNames}>
          <View style={tripDestinationStyles.tripDestinationText}>
            <View style={tripDestinationStyles.highlightedText}>
              <Text
                style={[
                  tripDestinationStyles.tripDestinationDetailsText,
                  tripDestinationStyles.tripDestinationSecondaryText,
                  {fontWeight: 'bold'},
                ]}>
                2 min away
              </Text>
            </View>

            <View style={tripDestinationStyles.addressContainer}>
              <Text style={tripDestinationStyles.addressText}>
                {origin.name}
              </Text>
              <Text style={tripDestinationStyles.addressText}>
                {origin.vicinity}
              </Text>
            </View>
          </View>
          <View style={tripDestinationStyles.tripDestinationText}>
            <View style={tripDestinationStyles.highlightedText}>
              <Text
                style={[
                  tripDestinationStyles.tripDestinationDetailsText,
                  tripDestinationStyles.tripDestinationSecondaryText,
                  {fontWeight: 'bold'},
                ]}>
                {duration.toFixed()} min
              </Text>
            </View>

            <View style={tripDestinationStyles.addressContainer}>
              <Text style={tripDestinationStyles.addressText}>
                {destination.name}
              </Text>
              <Text style={tripDestinationStyles.addressText}>
                {destination.vicinity}
              </Text>
            </View>
          </View>
        </BoxItem>
      </View>
    </BoxContainer>
  );
};

const tripDestinationStyles = StyleSheet.create({
  tripDestinationDetails: {
    position: 'relative',
    zIndex: 10,
    borderRadius: 0,
    backgroundColor: colors.lightgrey,
  },
  circle: {
    position: 'absolute',
    top: 15,
    left: 10,
    display: 'flex',
    alignItems: 'center',
    width: 50,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    top: 60,
    left: 35,
  },
  square: {
    position: 'absolute',
    top: 110,
    left: 10,
    display: 'flex',
    alignItems: 'center',
    width: 50,
  },

  tripDestinationNames: {
    display: 'flex',
    top: 5,
    left: 10,
  },
  tripDestinationText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
    paddingLeft: 50,
  },
  highlightedText: {
    paddingRight: 0,
    color: colors.darkBlue,
    marginBottom: 5,
    fontSize: 18,
    textTransform: 'uppercase',
    paddingTop: 5,
    justifyContent: 'space-between',
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
  },
  addressContainer: {
    flexDirection: 'column',
    display: 'flex',
  },
  addressText: {
    color: colors.darkBlue,
    fontSize: 16,
  },
  tripDestinationMeta: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  tripDestinationDetailsText: {
    marginTop: 0,
    color: colors.darkBlue,
    fontSize: 16,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  tripDestinationSecondaryText: {
    color: colors.darkBlue,
    fontSize: 16,
    textAlign: 'left',
    textTransform: 'none',
  },
  gridBlock: {
    width: '50%',
  },
  boxContainerTop: {
    backgroundColor: colors.grey,
  },
});

export default TripDestinationDetails;
